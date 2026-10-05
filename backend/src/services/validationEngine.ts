import mongoose from 'mongoose';
import Career from '../models/Career.js';
import Exam from '../models/Exam.js';
import College from '../models/College.js';
import Course from '../models/Course.js';

export class ValidationEngine {
  /**
   * Validates structural output from the LLM.
   * Ensures all references (Careers, Exams, Colleges) exist in the DB.
   * Modifies or removes invalid references to prevent UI crashes.
   */
  static async validateStructuredOutput(llmOutput: any): Promise<any> {
    const validatedOutput = { ...llmOutput };

    if (validatedOutput.recommendedCareers && Array.isArray(validatedOutput.recommendedCareers)) {
      validatedOutput.recommendedCareers = await this.filterValidEntities(Career, validatedOutput.recommendedCareers, 'careerId');
    }

    if (validatedOutput.recommendedExams && Array.isArray(validatedOutput.recommendedExams)) {
      validatedOutput.recommendedExams = await this.filterValidEntities(Exam, validatedOutput.recommendedExams, 'examId');
    }

    if (validatedOutput.recommendedColleges && Array.isArray(validatedOutput.recommendedColleges)) {
      validatedOutput.recommendedColleges = await this.filterValidEntities(College, validatedOutput.recommendedColleges, 'collegeId');
    }

    if (validatedOutput.recommendedCourses && Array.isArray(validatedOutput.recommendedCourses)) {
      validatedOutput.recommendedCourses = await this.filterValidEntities(Course, validatedOutput.recommendedCourses, 'courseId');
    }

    return validatedOutput;
  }

  /**
   * Helper to filter out entities whose IDs do not exist in the database.
   */
  private static async filterValidEntities(Model: mongoose.Model<any>, items: any[], idField: string) {
    const validItems = [];
    for (const item of items) {
      if (item[idField] && mongoose.Types.ObjectId.isValid(item[idField])) {
        const exists = await Model.findById(item[idField]).select('_id').lean();
        if (exists) {
          validItems.push(item);
        } else {
          console.warn(`[ValidationEngine] Redacting hallucinated reference: ${item[idField]} for ${Model.modelName}`);
        }
      } else {
        console.warn(`[ValidationEngine] Redacting invalid format ID: ${item[idField]}`);
      }
    }
    return validItems;
  }

  /**
   * Cross-references claims against known DB relationships (Anti-Hallucination).
   */
  static async verifyClaim(collegeId: string, requiredExamId: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(collegeId) || !mongoose.Types.ObjectId.isValid(requiredExamId)) {
      return false;
    }

    const college = await College.findById(collegeId).lean();
    if (!college) return false;

    // Check if the exam is actually in the college's accepted exams list
    // Depends on the College schema. Assuming it has an `acceptedExams` or `admissionProcess.exams` array
    const acceptedExams: string[] = []; 
    // Handle dynamic schema variations safely
    if ((college as any).acceptedExams) {
      acceptedExams.push(...(college as any).acceptedExams.map((e: any) => e.toString()));
    }
    if ((college as any).admissionProcess?.entranceExams) {
      acceptedExams.push(...(college as any).admissionProcess.entranceExams.map((e: any) => (e._id || e).toString()));
    }

    if (acceptedExams.length === 0) {
      return true; // If we don't have explicit restriction data, we err on the side of allowing it 
    }

    return acceptedExams.includes(requiredExamId.toString());
  }
}

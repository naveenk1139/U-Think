import { Router, Request, Response, NextFunction } from 'express';
import Degree from '../models/Degree';
import ExamDegreeMap from '../models/ExamDegreeMap';

const router = Router();

// Get roadmap for a specific degree
router.get('/:degreeId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const degree = await Degree.findById(req.params.degreeId);
    if (!degree) {
      res.status(404).json({ error: 'Degree not found' });
      return;
    }

    // A roadmap is a sequence of nodes.
    // Example: 10th -> 12th -> Exam -> Degree -> Higher Studies -> Career
    
    const roadmap = [];
    
    // 1. 10th Node (Always present as the start)
    roadmap.push({
      id: 'step-10th',
      title: '10th / SSLC',
      type: 'Foundation',
      description: 'Completion of secondary education is the first step.'
    });

    // 2. 12th / Eligibility Node
    if (degree.eligibility && degree.eligibility.required_subjects && degree.eligibility.required_subjects.length > 0) {
      roadmap.push({
        id: 'step-12th',
        title: '12th / PUC',
        type: 'Eligibility',
        description: `Required subjects: ${degree.eligibility.required_subjects.join(', ')}`
      });
    } else {
      roadmap.push({
        id: 'step-12th',
        title: '12th / Equivalent',
        type: 'Eligibility',
        description: 'Complete higher secondary education.'
      });
    }

    // 3. Exam Node (If entrance required)
    if (degree.entrance_required) {
      const mappings = await ExamDegreeMap.find({ degree_id: degree._id }).populate('exam_id');
      if (mappings.length > 0) {
        // @ts-ignore - Assuming populated exam_id has name
        const examNames = mappings.map(m => m.exam_id.name || 'Entrance Exam').join(' OR ');
        roadmap.push({
          id: 'step-exam',
          title: 'Entrance Examination',
          type: 'Exam',
          description: `Qualify in: ${examNames}`
        });
      }
    }

    // 4. Degree Node
    roadmap.push({
      id: 'step-degree',
      title: degree.name,
      type: 'Degree',
      description: `Complete the ${degree.duration} ${degree.duration_unit} program.`
    });

    // 5. Career / Higher Studies Nodes
    if (degree.career_options && degree.career_options.length > 0) {
      roadmap.push({
        id: 'step-career',
        title: 'Career Opportunities',
        type: 'Career',
        description: `Roles like: ${degree.career_options.slice(0, 3).join(', ')}`
      });
    }

    if (degree.higher_study_options && degree.higher_study_options.length > 0) {
      roadmap.push({
        id: 'step-higher-studies',
        title: 'Higher Studies',
        type: 'HigherStudy',
        description: `Pursue: ${degree.higher_study_options.slice(0, 3).join(', ')}`
      });
    }

    res.json({ roadmap });
  } catch (err) {
    next(err);
  }
});

export default router;

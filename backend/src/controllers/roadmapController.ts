import { Request, Response } from 'express';
import StudentRoadmap, { IRoadmapStep } from '../models/StudentRoadmap.js';
import Career from '../models/Career.js';

export const generateRoadmap = async (req: Request, res: Response) => {
  try {
    const { careerId, studentId = 'student_test_123' } = req.body;

    const career = await Career.findById(careerId);
    if (!career) return res.status(404).json({ error: 'Career not found' });

    // Check if roadmap already exists
    let roadmap = await StudentRoadmap.findOne({ studentId, targetCareerId: careerId });
    
    if (!roadmap) {
      // Generate steps
      const steps: IRoadmapStep[] = [
        {
          stepId: 'step_1',
          title: 'High School Foundation',
          type: 'Foundation',
          description: 'Complete 11th and 12th grade with Science (PCM/PCB depending on field) to build a strong analytical foundation.',
          status: 'COMPLETED'
        },
        {
          stepId: 'step_2',
          title: 'Entrance Examinations',
          type: 'Exam',
          description: 'Prepare and appear for relevant national/state-level entrance exams (e.g., JEE, NEET, CUET).',
          status: 'PENDING'
        },
        {
          stepId: 'step_3',
          title: 'Undergraduate Degree',
          type: 'Degree',
          description: `Enroll in a relevant Bachelor's degree program (e.g., B.Tech, B.Sc) focusing on core fundamentals.`,
          status: 'PENDING'
        },
        {
          stepId: 'step_4',
          title: 'Specialization & Upskilling',
          type: 'Skill',
          description: `Master industry-required skills: ${career.skills.join(', ')}.`,
          status: 'PENDING'
        },
        {
          stepId: 'step_5',
          title: 'Internships & Projects',
          type: 'Project',
          description: 'Apply your skills in real-world scenarios through internships and capstone projects.',
          status: 'PENDING'
        },
        {
          stepId: 'step_6',
          title: 'Postgraduate / Advanced Research',
          type: 'Degree',
          description: 'Optional: Pursue an M.Tech or PhD in a Super Specialization to unlock advanced roles.',
          status: 'PENDING'
        },
        {
          stepId: 'step_7',
          title: `Launch Career: ${career.name}`,
          type: 'Career',
          description: 'Apply for roles and begin your professional journey.',
          status: 'PENDING'
        }
      ];

      roadmap = await StudentRoadmap.create({
        studentId,
        targetCareerId: career._id,
        targetCareerName: career.name,
        currentPhase: 'Entrance Examinations',
        overallProgress: 15,
        skillGaps: career.skills.map(skill => ({
          skillName: skill,
          currentLevel: 'None',
          requiredLevel: 'Advanced',
          gapDescription: `Need to acquire practical experience in ${skill}`
        })),
        steps,
        isActive: true,
        generatedAt: new Date(),
        lastUpdated: new Date()
      });
    }

    res.status(201).json(roadmap);
  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
};

export const getMyRoadmaps = async (req: Request, res: Response) => {
  try {
    const studentId = req.query.studentId || 'student_test_123';
    const roadmaps = await StudentRoadmap.find({ studentId }).sort({ lastUpdated: -1 });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roadmaps' });
  }
};

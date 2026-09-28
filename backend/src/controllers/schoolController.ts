import { Request, Response } from 'express';
import Board from '../models/Board.js';
import SchoolClass from '../models/SchoolClass.js';
import Syllabus from '../models/Syllabus.js';
import Unit from '../models/Unit.js';
import Chapter from '../models/Chapter.js';
import Topic from '../models/Topic.js';

export const getBoards = async (req: Request, res: Response) => {
  try {
    const boards = await Board.find({ active: true }).sort({ name: 1 }).lean();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
};

export const getClasses = async (req: Request, res: Response) => {
  try {
    // Only return Classes 1 to 10 for basic school exploration
    const classes = await SchoolClass.find({ gradeLevel: { $lte: 10 }, active: true }).sort({ gradeLevel: 1 }).lean();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
};

export const getSyllabusList = async (req: Request, res: Response) => {
  try {
    const { classId, boardId } = req.query;
    if (!classId || !boardId) {
       return res.status(400).json({ error: 'classId and boardId are required' });
    }
    const syllabi = await Syllabus.find({ classId, boardId, active: true })
      .populate('subjectId')
      .lean();
    res.json(syllabi);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch syllabus list' });
  }
};

export const getSyllabusHierarchy = async (req: Request, res: Response) => {
  try {
    const { syllabusId } = req.params;
    const units = await Unit.find({ syllabusId, active: true }).sort({ order: 1 }).lean();
    
    const hierarchy = await Promise.all(units.map(async (unit) => {
      const chapters = await Chapter.find({ unitId: unit._id, active: true }).sort({ order: 1 }).lean();
      
      const chaptersWithTopics = await Promise.all(chapters.map(async (chapter) => {
        const topics = await Topic.find({ chapterId: chapter._id, active: true }).sort({ order: 1 }).lean();
        return { ...chapter, topics };
      }));
      
      return { ...unit, chapters: chaptersWithTopics };
    }));
    
    res.json(hierarchy);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch syllabus hierarchy' });
  }
};

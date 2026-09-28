import { Request, Response } from 'express';
import Degree from '../models/Degree.js';
import Specialization from '../models/Specialization.js';
import EducationPathRelation from '../models/EducationPathRelation.js';
import Skill from '../models/Skill.js';
import Career from '../models/Career.js';
import Job from '../models/Job.js';

// 1. Get PG Degrees from a Specialization
export const getPgDegrees = async (req: Request, res: Response) => {
  try {
    const { specId } = req.params;
    // We assume EducationPathRelation stores specId in sourceId, and PG Degree in targetId
    const relations = await EducationPathRelation.find({
      sourceType: 'Specialization',
      sourceId: specId,
      targetType: 'Degree', // which are PG
      relationType: 'ENABLES'
    }).lean();

    const degreeIds = relations.map(r => r.targetId);
    const pgDegrees = await Degree.find({ _id: { $in: degreeIds }, level: 'PG', active: true }).lean();
    res.json(pgDegrees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch PG Degrees' });
  }
};

// 2. Get Super Specializations / Research from a PG Degree
export const getSuperSpecializations = async (req: Request, res: Response) => {
  try {
    const { pgId } = req.params;
    // We assume EducationPathRelation stores pgId in sourceId, and Super Specialization or Research (Degree PhD) in targetId
    const relations = await EducationPathRelation.find({
      sourceId: pgId,
      relationType: 'ENABLES'
    }).lean();

    const targetIds = relations.map(r => r.targetId);
    
    // It could map to Specialization (Super Spec) or Degree (PhD)
    const superSpecs = await Specialization.find({ _id: { $in: targetIds }, active: true }).lean();
    const research = await Degree.find({ _id: { $in: targetIds }, level: 'PhD', active: true }).lean();
    
    res.json({ superSpecs, research });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Super Specializations' });
  }
};

// 3. Get Skills from a Super Specialization or Research
export const getSkills = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // superSpecId or researchId
    
    const relations = await EducationPathRelation.find({
      sourceId: id,
      targetType: 'Skill',
      relationType: 'ENABLES'
    }).lean();

    const skillIds = relations.map(r => r.targetId);
    const skills = await Skill.find({ _id: { $in: skillIds }, active: true }).lean();
    
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Skills' });
  }
};

// 4. Get Careers from Skills
export const getCareers = async (req: Request, res: Response) => {
  try {
    const { skillName } = req.params;
    // Find careers that require this skill
    const careers = await Career.find({ skills: skillName, active: true }).lean();
    res.json(careers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Careers' });
  }
};

// 5. Get Jobs from a Career
export const getJobs = async (req: Request, res: Response) => {
  try {
    const { careerId } = req.params;
    const career = await Career.findById(careerId);
    if (!career) return res.status(404).json({ error: 'Career not found' });
    
    // Match jobs based on career name or keywords (simple implementation for now)
    const jobs = await Job.find({ 
      $or: [
        { title: { $regex: career.name, $options: 'i' } },
        { category: { $regex: career.name, $options: 'i' } }
      ]
    }).limit(10).lean();
    
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Jobs' });
  }
};

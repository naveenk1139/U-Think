import { Request, Response } from 'express';
import Pathway from '../models/Pathway.js';
import Stream from '../models/Stream.js';
import Trade from '../models/Trade.js';
import Course from '../models/Course.js';
import Branch from '../models/Branch.js';
import College from '../models/College.js';
import Exam from '../models/Exam.js';
import Career from '../models/Career.js';

export const globalSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.q as string;
    if (!query) {
      res.status(400).json({ error: 'Search query is required' });
      return;
    }

    const regex = new RegExp(query, 'i');

    const [
      pathways,
      streams,
      trades,
      courses,
      branches,
      colleges,
      exams,
      careers
    ] = await Promise.all([
      Pathway.find({ name: regex }).limit(5).select('name slug level type'),
      Stream.find({ name: regex }).limit(5).select('name slug pathwayId'),
      Trade.find({ name: regex }).limit(5).select('name slug'),
      Course.find({ name: regex }).limit(5).select('name slug'),
      Branch.find({ name: regex }).limit(5).select('name slug'),
      College.find({ name: regex }).limit(5).select('name slug location'),
      Exam.find({ name: regex }).limit(5).select('name slug'),
      Career.find({ name: regex }).limit(5).select('name slug')
    ]);

    const results = [
      ...pathways.map((p: any) => ({ _id: p._id, type: 'Pathway', name: p.name, slug: p.slug, url: `/pathways/${p.level || 'after-10th'}/${p.slug}` })),
      ...streams.map((s: any) => ({ _id: s._id, type: 'Stream', name: s.name, slug: s.slug, url: `/streams` })), // We might need to construct a better URL if pathway slug is known, but for now this works.
      ...trades.map((t: any) => ({ _id: t._id, type: 'Trade', name: t.name, slug: t.slug, url: `/streams` })),
      ...courses.map((c: any) => ({ _id: c._id, type: 'Course', name: c.name, slug: c.slug, url: `/courses/${c._id}` })),
      ...branches.map((b: any) => ({ _id: b._id, type: 'Branch', name: b.name, slug: b.slug, url: `/branches/${b._id}` })),
      ...colleges.map((c: any) => ({ _id: c._id, type: 'Institution', name: c.name, slug: c.slug, url: `/colleges/${c._id}` })),
      ...exams.map((e: any) => ({ _id: e._id, type: 'Exam', name: e.name, slug: e.slug, url: `/exams/${e._id}` })),
      ...careers.map((c: any) => ({ _id: c._id, type: 'Career', name: c.name, slug: c.slug, url: `/jobs/${c._id}` }))
    ];

    res.json({ results });
  } catch (error) {
    console.error('Global search error:', error);
    res.status(500).json({ error: 'Server error during search' });
  }
};

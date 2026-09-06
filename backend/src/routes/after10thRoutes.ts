import { Router } from 'express';
import After10thPathway from '../models/After10thPathway';
import After10thCategory from '../models/After10thCategory';

const router = Router();

// Get the full After-10th tree structure
router.get('/tree', async (req, res) => {
  try {
    const pathways = await After10thPathway.find({ status: 'active' }).sort({ order: 1 });
    const categories = await After10thCategory.find().sort({ order: 1 });
    
    // Group categories by pathwayId
    const tree = pathways.map(pathway => {
      const pathwayCats = categories.filter(cat => cat.pathwayId.toString() === pathway._id.toString());
      return {
        ...pathway.toObject(),
        categories: pathwayCats
      };
    });
    
    res.json(tree);
  } catch (error) {
    console.error('Error fetching After 10th tree:', error);
    res.status(500).json({ error: 'Failed to fetch tree' });
  }
});

// Search within After 10th
router.get('/search', async (req, res) => {
  try {
    const query = (req.query.q as string) || '';
    if (!query || query.length < 2) {
      return res.json([]);
    }

    const regex = new RegExp(query, 'i');
    
    const [pathways, categories] = await Promise.all([
      After10thPathway.find({ $or: [{ name: regex }, { description: regex }] }).limit(10),
      After10thCategory.find({ $or: [{ name: regex }, { description: regex }, { possibleSubjects: regex }, { majorDisciplines: regex }] }).limit(10)
    ]);
    
    const results = [
      ...pathways.map(p => ({ _id: p._id, name: p.name, slug: p.slug, type: 'Pathway', description: p.description })),
      ...categories.map(c => ({ _id: c._id, name: c.name, slug: c.slug, type: 'Category', description: c.description }))
    ];
    
    res.json(results);
  } catch (error) {
    console.error('Error searching After 10th:', error);
    res.status(500).json({ error: 'Failed to search' });
  }
});

// Get a specific pathway with its categories
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const pathway = await After10thPathway.findOne({ slug });
    if (!pathway) {
      return res.status(404).json({ error: 'Pathway not found' });
    }
    const categories = await After10thCategory.find({ pathwayId: pathway._id }).sort({ order: 1 });
    res.json({
      ...pathway.toObject(),
      categories
    });
  } catch (error) {
    console.error('Error fetching After 10th pathway:', error);
    res.status(500).json({ error: 'Failed to fetch pathway' });
  }
});

export default router;

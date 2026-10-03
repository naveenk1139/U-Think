import mongoose from 'mongoose';
import Pathway from './src/models/Pathway.js';

mongoose.connect('mongodb://127.0.0.1/uthink').then(async () => {
  const pathways = await Pathway.find().sort({ createdAt: 1 });
  const slugs = new Set();
  const toDelete = [];
  
  for (const p of pathways) {
    if (slugs.has(p.slug)) {
      toDelete.push(p._id);
    } else {
      slugs.add(p.slug);
    }
  }
  
  if (toDelete.length > 0) {
    await Pathway.deleteMany({ _id: { $in: toDelete } });
    console.log('Deleted duplicate pathways by slug.');
  } else {
    console.log('No duplicate pathways found by slug.');
  }
  
  const names = new Set();
  const toDeleteByName = [];
  const pathwaysByName = await Pathway.find().sort({ createdAt: 1 });
  for (const p of pathwaysByName) {
    if (names.has(p.name)) {
      toDeleteByName.push(p._id);
    } else {
      names.add(p.name);
    }
  }
  
  if (toDeleteByName.length > 0) {
    await Pathway.deleteMany({ _id: { $in: toDeleteByName } });
    console.log('Deleted duplicate pathways by name.');
  } else {
    console.log('No duplicate pathways found by name.');
  }

  process.exit(0);
});

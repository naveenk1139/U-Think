import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

async function backup() {
  await mongoose.connect('mongodb://127.0.0.1:27017/uthink');
  console.log('Connected to DB for backup...');
  
  const pathways = await mongoose.connection.db.collection('pathways').find({}).toArray();
  const streams = await mongoose.connection.db.collection('streams').find({}).toArray();
  const courses = await mongoose.connection.db.collection('courses').find({}).toArray();
  
  const backupDir = path.join(process.cwd(), 'backups');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
  
  const timestamp = Date.now();
  fs.writeFileSync(path.join(backupDir, `pathways_${timestamp}.json`), JSON.stringify(pathways, null, 2));
  fs.writeFileSync(path.join(backupDir, `streams_${timestamp}.json`), JSON.stringify(streams, null, 2));
  fs.writeFileSync(path.join(backupDir, `courses_${timestamp}.json`), JSON.stringify(courses, null, 2));
  
  console.log(`Backup completed successfully at backups/ with timestamp ${timestamp}`);
  process.exit(0);
}
backup().catch(console.error);

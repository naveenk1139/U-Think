import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolves to U-THINK/backend/uploads
export const UPLOAD_DIR = path.join(__dirname, '../../uploads');
export const DOCUMENTS_DIR = path.join(UPLOAD_DIR, 'documents');

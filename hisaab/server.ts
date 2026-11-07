import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { authRouter } from './server/routes/auth.js';
import { apiRouter } from './server/routes/api.js';
import { atlasAdapter } from './server/db/atlas_adapter.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Auto-connect to Live MongoDB Atlas
  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://hisaab_user:Password123@cluster0.c6hey1w.mongodb.net/hisaab_pro?retryWrites=true&w=majority';
  atlasAdapter.connect(mongoUri).then((res) => {
    if (res.success) {
      console.log(`🍃 MongoDB Atlas Live Database: CONNECTED (${res.message})`);
    } else {
      console.log(`ℹ️ MongoDB Atlas status: ${res.message}`);
    }
  }).catch((err) => {
    console.warn('MongoDB Atlas startup connection note:', err.message);
  });

  // JSON Body Parser with ample limit for receipts/evidence base64 images
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // REST API Routes
  app.use('/api/auth', authRouter);
  app.use('/api', apiRouter);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'online',
      service: 'Hisaab Pro Full-Stack REST API',
      time: new Date().toISOString()
    });
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Development mode: Mount Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('⚡ Vite dev server middleware mounted');
  } else {
    // Production mode: Serve built static assets from dist
    const candidatePath = path.resolve(__dirname, 'dist');
    const distPath = fs.existsSync(candidatePath) ? candidatePath : __dirname;
    const indexPath = fs.existsSync(path.resolve(distPath, 'index.html'))
      ? path.resolve(distPath, 'index.html')
      : path.resolve(process.cwd(), 'dist', 'index.html');

    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(indexPath);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=================================================`);
    console.log(`🚀 Hisaab Pro Server running on http://0.0.0.0:${PORT}`);
    console.log(`🔐 Default Admin: admin0987654321 / admin0987654321`);
    console.log(`🗄️ Database: JSON storage ready + MySQL & MongoDB schemas`);
    console.log(`=================================================`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});

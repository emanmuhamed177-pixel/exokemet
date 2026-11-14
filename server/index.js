import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const app = express();
const port = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

app.disable('x-powered-by');
app.get('/health', (_req, res) => res.status(200).json({ ok: true, service: 'exokemet' }));

if (isProduction) {
  app.use(express.static(path.join(root, 'dist'), { index: false }));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/auth/')) return next();
    if (req.path.startsWith('/assets/') || req.path.startsWith('/images/')) return next();
    res.sendFile(path.join(root, 'dist', 'index.html'));
  });
} else {
  const vite = await createViteServer({ root, server: { middlewareMode: true, hmr: true }, appType: 'spa' });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`EXOKEMET explorer listening on 0.0.0.0:${port} (no login or database required).`);
});

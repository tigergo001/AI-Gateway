import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock database
  let mockUser = {
    name: 'Alex Chen',
    email: 'alex.chen@enterprise-ai.io',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256'
  };

  // Auth Middleware
  const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      // In a real app, verify token here
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

  // API Routes
  app.get('/api/user', authMiddleware, (req, res) => {
    res.json(mockUser);
  });

  app.put('/api/user', authMiddleware, (req, res) => {
    mockUser = { ...mockUser, ...req.body };
    res.json(mockUser);
  });

  app.get('/api/workspaces', authMiddleware, (req, res) => {
    res.json([
      { id: '1', name: 'Production Environment A', status: 'Active', units: 12, date: '2024-03-01' },
      { id: '2', name: 'Testing - Beta', status: 'Active', units: 4, date: '2024-03-15' },
      { id: '3', name: 'Archive: 2023 Geek Week', status: 'Archived', units: 0, date: '2023-11-20' },
    ]);
  });

  app.get('/api/stats', authMiddleware, (req, res) => {
    res.json({
      todayTokens: '1.2M',
      estCost: '42.50',
      activeModels: '8/12',
      recentActivity: [
        { id: 'log_3921', model: 'GPT-4o', status: '200', statusText: 'OK', timestamp: '2s ago' },
        { id: 'log_3920', model: 'Claude 3.5 Sonnet', status: '200', statusText: 'OK', timestamp: '15s ago' },
      ]
    });
  });

  app.get('/api/notifications', authMiddleware, (req, res) => {
    res.json([
      { id: 1, title: 'High Latency Detected', desc: 'GPT-4o in US-East is experiencing delays.', time: '2m ago', unread: true },
      { id: 2, title: 'Quota Alert', desc: 'Daily token quota is at 85%.', time: '1h ago', unread: true },
      { id: 3, title: 'New Login', desc: 'New login from Chrome on macOS.', time: '3h ago', unread: false },
    ]);
  });

  // Login endpoint
  app.post('/api/login', (req, res) => {
    const { phone, password } = req.body;
    // Simple mock login
    if (phone && (password || req.body.code)) {
      res.json({
        token: 'mock-jwt-token',
        user: mockUser
      });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

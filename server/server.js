const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const initializeDatabase = require('./config/schema');
const authRoutes = require('./routes/auth');
const functionCheckpointRoutes = require('./routes/functionCheckpoint');
const technicianChecklistRoutes = require('./routes/technicianChecklist');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5001;

// Trust proxy if behind a reverse proxy (Nginx, Cloudflare, etc.)
app.set('trust proxy', 1);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message: { success: false, error: 'Too many login attempts from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to login route specifically
app.use('/api/auth/login', loginLimiter);

// Routes
app.use('/api', authRoutes);
app.use('/api', authenticateToken, functionCheckpointRoutes);
app.use('/api', authenticateToken, technicianChecklistRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

async function startServer() {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(error => {
  console.error('Unable to start server:', error);
  process.exit(1);
});

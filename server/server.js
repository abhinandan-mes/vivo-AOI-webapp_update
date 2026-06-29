const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const initializeDatabase = require('./config/schema');
const authRoutes = require('./routes/auth');
const functionCheckpointRoutes = require('./routes/functionCheckpoint');
const technicianChecklistRoutes = require('./routes/technicianChecklist');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

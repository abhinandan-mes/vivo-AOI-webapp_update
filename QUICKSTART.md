# 🚀 Quick Start Guide

## System Requirements
- Node.js v14+
- PostgreSQL v12+
- npm or yarn
- ~500MB disk space

## 1️⃣ Database Setup

### Create PostgreSQL Database
```bash
# Open PostgreSQL terminal
psql -U postgres

# Create database
CREATE DATABASE aoi_checklist;

# Exit
\q
```

## 2️⃣ Backend Setup

```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Update .env with your PostgreSQL credentials
# Edit server/.env and set:
# DB_USER=your_username
# DB_PASSWORD=your_password
# DB_HOST=localhost

# Start backend (with auto-reload)
npm run dev

# Server runs on: http://localhost:5001
```

## 3️⃣ Frontend Setup

```bash
# Open new terminal, navigate to client
cd client

# Install dependencies
npm install

# Start frontend
npm start

# App opens on: http://localhost:3000
```

## 📋 Features Overview

### Component 1: Daily Function Checkpoint
- **Purpose**: Track equipment function checks
- **Fields**: 
  - Date, Shift, Person, Time
  - 8 equipment groups with Before/After checks
  - Bottom/Top sensor status
- **Data**: Saved to `aoi_function_checkpoint` table

### Component 2: Technician Checklist
- **Purpose**: Daily AOI technician inspection
- **Fields**:
  - Line, Date, Shift
  - Program name & stencil serial
  - Barcode read info (Layer A & B)
  - Workorder tracking
  - Confirmation status
- **Data**: Saved to `aoi_technician_checklist` table

## 🔗 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/checkpoint` | Create checkpoint |
| GET | `/api/checkpoint` | Get all checkpoints |
| GET | `/api/checkpoint/:id` | Get by ID |
| GET | `/api/checkpoint/date/:date` | Get by date |
| POST | `/api/checklist` | Create checklist |
| GET | `/api/checklist` | Get all checklists |
| GET | `/api/checklist/:id` | Get by ID |
| GET | `/api/checklist/date/:date` | Get by date |

## 🎨 Design Features

✨ **Modern UI**
- Gradient backgrounds
- Smooth animations
- Responsive grid layout
- Custom styled checkboxes

📱 **Mobile Responsive**
- Works on tablet & mobile
- Touch-friendly controls
- Adaptive layouts

🎯 **User Experience**
- Real-time form validation
- Success/error messages
- Auto-focus inputs
- Keyboard navigation

## 📊 Database Info

### Tables
- `aoi_function_checkpoint` - Equipment checks (40+ fields)
- `aoi_technician_checklist` - Technician records (13 fields)

### Indexes
- Date indexing for fast queries
- Line indexing for filtering

## 🆘 Troubleshooting

**Port 3000/5001 already in use?**
```bash
# Change in server/.env
PORT=5001

# Or kill process
lsof -ti:3000 | xargs kill -9
```

**Database connection error?**
- Check PostgreSQL is running
- Verify credentials in .env
- Ensure database exists: `CREATE DATABASE aoi_checklist;`

**Module not found?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📝 Example API Usage

```bash
# Create checkpoint
curl -X POST http://localhost:5001/api/checkpoint \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-15",
    "shift": "Day",
    "responsible_person": "John Doe",
    "laser_barcode_before_bot": true,
    "laser_barcode_before_top": true
  }'

# Get all checkpoints
curl http://localhost:5001/api/checkpoint
```

## 🎓 Learning Resources

- **React**: Components, State, Forms
- **Node.js**: Express, Routing, Controllers
- **PostgreSQL**: Schemas, Queries, Indexing
- **CSS**: Grid, Flexbox, Gradients, Animations

---

**Happy Inspecting! 🔍📋**

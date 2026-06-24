# AOI CheckPoint - Daily Inspection System

A modern full-stack web application for managing AOI (Automated Optical Inspection) daily checklists and function checks.

## 📋 Features

- **Daily Function Checkpoint**: Track equipment function checks with multiple sensors (Laser Barcode, SPI, Pre-AOI, etc.)
- **Technician Checklist**: Complete daily AOI technician inspection reports
- **Modern UI**: Clean, responsive design with Tailwind-inspired styling
- **Real-time Data**: React frontend with API integration
- **PostgreSQL Database**: Secure data storage and retrieval

## 🛠 Tech Stack

- **Frontend**: React 18, Modern CSS3
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **API**: RESTful API with CORS support

## 📁 Project Structure

```
├── server/
│   ├── config/
│   │   ├── db.js           # Database connection
│   │   └── schema.js       # Database schema initialization
│   ├── models/
│   │   ├── FunctionCheckpoint.js
│   │   └── TechnicianChecklist.js
│   ├── controllers/
│   │   ├── FunctionCheckpointController.js
│   │   └── TechnicianChecklistController.js
│   ├── routes/
│   │   ├── functionCheckpoint.js
│   │   └── technicianChecklist.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── FunctionCheckpoint.js
│   │   │   ├── FunctionCheckpoint.css
│   │   │   ├── TechnicianChecklist.js
│   │   │   └── TechnicianChecklist.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

#### 1. Setup PostgreSQL Database

```bash
# Create database
createdb aoi_checklist

# Or if using PostgreSQL GUI, create a database named "aoi_checklist"
```

#### 2. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Update .env with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=your_postgres_user
# DB_PASSWORD=your_postgres_password
# DB_NAME=aoi_checklist

# Start the server
npm run dev
```

Server will run on `http://localhost:5001`

#### 3. Setup Frontend

```bash
cd client

# Install dependencies
npm install

# Start the React app
npm start
```

App will open on `http://localhost:3000`

## 📚 API Documentation

### Function Checkpoint Endpoints

```
POST   /api/checkpoint              - Create new checkpoint
GET    /api/checkpoint              - Get all checkpoints
GET    /api/checkpoint/:id          - Get checkpoint by ID
GET    /api/checkpoint/date/:date   - Get checkpoints by date
```

### Technician Checklist Endpoints

```
POST   /api/checklist               - Create new checklist
GET    /api/checklist               - Get all checklists
GET    /api/checklist/:id           - Get checklist by ID
GET    /api/checklist/date/:date    - Get checklists by date
GET    /api/checklist/line/:line    - Get checklists by line
```

## 🎨 Components

### FunctionCheckpoint
Allows users to record daily equipment function checks:
- Equipment: Laser Barcode, SPI, Pre-AOI, Post-AOI, etc.
- Status: Before/After for Bottom/Top sensors
- Modern checkbox UI with visual feedback

### TechnicianChecklist
Complete daily inspection records:
- Line & Shift information
- Program & Setup details
- Barcode reading information (Layer A & B)
- Workorder tracking
- Confirmation status

## 📊 Database Schema

### aoi_function_checkpoint
- Stores equipment function check data
- Indexed by date and shift for fast queries
- 40+ boolean fields for different equipment checks

### aoi_technician_checklist
- Stores technician daily checklist records
- Indexed by date and line for efficient retrieval
- Tracks barcode reads, workorders, and scan tools

## 🌐 Environment Variables

### Server (.env)
```
NODE_ENV=development
PORT=5001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=aoi_checklist
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5001/api
```

## 🧪 Testing

### Manual Testing
1. Navigate to Daily Function Check tab
2. Fill in the form and submit
3. Check success message
4. Switch to Technician Checklist tab
5. Fill in and submit
6. Verify data appears in database

### Database Verification
```sql
SELECT * FROM aoi_function_checkpoint;
SELECT * FROM aoi_technician_checklist;
```

## 🐛 Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Verify credentials in server/.env
- Check if database "aoi_checklist" exists

### CORS Error
- Backend running on port 5001
- Frontend running on port 3000
- Check proxy setting in client/package.json

### Port Already in Use
```bash
# Check the process on port 5001
lsof -nP -iTCP:5001 -sTCP:LISTEN

# Or change PORT in .env
```

## 📝 Development

### Add New Fields
1. Update database schema in `server/config/schema.js`
2. Update model in `server/models/`
3. Update controller in `server/controllers/`
4. Update React component and form

### Styling
- Modern CSS3 with CSS Grid and Flexbox
- Responsive design with mobile breakpoints
- Smooth transitions and hover effects

## 🔒 Security Notes

- Input validation on backend
- Use environment variables for sensitive data
- CORS configured for localhost development
- SQL injection prevention via parameterized queries

## 📄 License

This project is created for AOI inspection workflows.

## 👥 Support

For issues or questions, please check:
1. Database connectivity
2. Environment variables
3. Port availability
4. Node.js and npm versions

---

**Version**: 1.0.0  
**Last Updated**: 2024

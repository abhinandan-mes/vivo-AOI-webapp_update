# 🧠 Project Memory: AOI CheckPoint - Daily Inspection System

This document serves as the project memory and system documentation for the **AOI CheckPoint (Daily Inspection System)**. It provides context about the application's architecture, data model, backend API, frontend components, and development guidelines for future agent/developer sessions.

---

## 📌 Project Overview
**AOI CheckPoint** is a web application designed to digitize and manage Daily Function Checkpoints and Technician Daily Checklists for Automated Optical Inspection (AOI) equipment. It helps manufacturing engineers and technicians track the status and functionality of optical scanners and inspection tools across different lines and shifts.

---

## 🛠 Tech Stack
- **Frontend**: React 18, React Router DOM (v6), Axios for API communication, and Vanilla CSS3 (utilizing CSS Grid, Flexbox, transitions, and responsive styles).
- **Backend**: Node.js & Express.js.
- **Database**: PostgreSQL (pg driver).
- **Security**: JWT-based authentication, password hashing with bcrypt, parameterized SQL queries to prevent injection, and CORS enabled for client development.

---

## 📁 Repository Structure
```
├── server/                             # Backend Application
│   ├── config/
│   │   ├── db.js                       # PostgreSQL client connection pool
│   │   └── schema.js                   # Database schema definitions & migrations
│   ├── models/
│   │   ├── FunctionCheckpoint.js       # Model operations for function checks
│   │   └── TechnicianChecklist.js      # Model operations for technician checklists
│   ├── controllers/
│   │   ├── FunctionCheckpointController.js
│   │   └── TechnicianChecklistController.js
│   ├── middleware/
│   │   └── auth.js                     # JWT authorization middleware
│   ├── routes/
│   │   ├── auth.js                     # User registration, authentication, management
│   │   ├── functionCheckpoint.js       # Function checkpoint routes
│   │   └── technicianChecklist.js      # Technician checklist routes
│   ├── .env                            # Backend configuration (DB details, keys)
│   ├── package.json
│   └── server.js                       # Express application bootstrap
├── client/                             # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/                     # Icons, logos, and static graphics
│   │   ├── components/
│   │   │   ├── LoginPage.js / .css     # Authentication UI
│   │   │   ├── FunctionCheckpoint.js / .css # Daily Function Checks form
│   │   │   ├── TechnicianChecklist.js / .css # Technician Checklist form
│   │   │   ├── Reports.js / .css       # Data filtering & CSV download reports
│   │   │   └── UserManagement.js / .css # Admin panel for user administration
│   │   ├── services/
│   │   │   └── api.js                  # Axios configuration, interceptors, API requests
│   │   ├── App.js / .css               # Root component (tabs, session restoration)
│   │   ├── index.js / .css             # Frontend entrypoint
│   └── package.json
├── setup.sh / setup.bat                # Setup scripts for backend & frontend packages
├── README.md                           # Main user-facing readme
└── QUICKSTART.md                       # Quick start developer instructions
```

---

## 📊 Database Schema & Migrations

The database schema is managed and mapped using **Prisma ORM**. The schema is defined in [schema.prisma](file:///Users/abhinandan/Documents/AOi_check_sheet/server/prisma/schema.prisma).

### Database Migrations Management
* **Startup Migrations**: The server dynamically runs `npx prisma migrate deploy` upon startup in [schema.js](file:///Users/abhinandan/Documents/AOi_check_sheet/server/config/schema.js) to ensure pending migrations are applied.
* **Adding/Modifying Schema Fields**:
  When you make any database addition or change:
  1. Modify the models in [schema.prisma](file:///Users/abhinandan/Documents/AOi_check_sheet/server/prisma/schema.prisma).
  2. Run the following command in the `server` directory to create and apply a migration:
     ```bash
     npx prisma migrate dev --name <migration_name>
     ```
  3. Commit the new migration files created in `server/prisma/migrations/`.

The mapped PostgreSQL tables are:

### 1. `app_users`
Stores application users, their roles, and credentials.
- `id` (SERIAL PRIMARY KEY)
- `username` (VARCHAR(100) UNIQUE, NOT NULL)
- `password_hash` (VARCHAR(255), NOT NULL)
- `full_name` (VARCHAR(150), NOT NULL)
- `role` (VARCHAR(50), DEFAULT 'operator') - Can be `super_admin`, `admin`, `inspector`, `technician`.
- `created_at` / `updated_at` (TIMESTAMP)

### 2. `app_sessions`
Tracks user login sessions, including status, last login, and IP address.
- `session_id` (UUID PRIMARY KEY)
- `user_id` (INT REFERENCES app_users(id) ON DELETE CASCADE)
- `public_ip` (VARCHAR(100))
- `login_time` (TIMESTAMP)
- `logout_time` (TIMESTAMP)
- `status` (VARCHAR(50), default 'active', can be 'logged_out')

### 3. `aoi_function_checkpoint`
Stores checklist items for equipment function checks.
- Contains 40+ boolean fields (e.g., `laser_barcode_before_bot`, `laser_barcode_before_top`, `spi_barcode_after_bot`, etc.) grouped into:
  - Laser Barcode Detection (Before/After for Bottom/Top)
  - Laser PCB Text Detection (Before/After)
  - SPI Barcode Detection (Before/After for Bottom/Top)
  - SPI MES Detection (Before/After for Bottom/Top)
  - Pre-AOI Barcode Detection (Before/After for Bottom/Top)
  - Post-AOI Barcode Detection (Before/After for Bottom/Top)
  - SPI FOV (Before/After)
  - Pre-AOI FOV (Before/After)
  - Password Function at Pre-AOI (Before/After)
  - Pre-AOI SPC (Before/After)
  - Post-AOI FOV (Before/After)
- Meta fields: `line`, `group_name`, `date`, `shift`, `responsible_person`, `time`.

### 4. `aoi_technician_checklist`
Stores checklist entries for daily technician inspections.
- `id` (SERIAL PRIMARY KEY)
- `line` (VARCHAR(50))
- `group_name` (VARCHAR(100))
- `date` (DATE, NOT NULL)
- `shift` (VARCHAR(50), NOT NULL)
- `pre_aoi_program_full_name` (VARCHAR(255))
- `stencil_serial_no_b_side` (VARCHAR(100))
- `stencil_serial_no_a_side` (VARCHAR(100))
- `barcode_read_a_layer` (VARCHAR(50))
- `barcode_read_a_spi` (VARCHAR(50))
- `barcode_read_b_layer` (VARCHAR(50))
- `barcode_read_b_spi` (VARCHAR(50))
- `workorder_info_pre_aoi` (VARCHAR(255))
- `workorder_info_post_aoi` (VARCHAR(255))
- `aoi_scan_tools_workorder_traceability` (VARCHAR(255))
- `confirmation` (VARCHAR(50))

---

## 🔒 Authentication & Authorization Flow

1. **Tokens**: JWT is generated during login with an 8-hour expiry. It is saved in browser `localStorage` as `aoi_auth_token`.
2. **Interceptors**: Frontend API client (`client/src/services/api.js`) appends the bearer token in headers and intercepts `401 Unauthorized` responses to dispatch a logout event (`aoi-auth-expired`).
3. **Role-Based Access Control (RBAC)**:
   - `super_admin`: Can manage all users (create/edit/delete roles including other admins/super_admins).
   - `admin`: Can view user list and manage users with `inspector` or `technician` roles.
   - `inspector` / `technician`: Standard roles that fill checklists and generate reports but cannot access the User Management tab.

---

## ⚠️ Known Issues & Technical Debt

### Resolved: Duplicate & Broken Routes in `server/routes/auth.js`
- **Status**: Fixed
- **Details**: The duplicate route registrations for `GET /auth/users` and `PUT /auth/users/:id` at the bottom of `server/routes/auth.js` have been removed. The authentication endpoints are now clean, optimized, and execute correctly.


---

## 🚀 Getting Started & Configuration

### Prerequisites
- Node.js (v14+)
- PostgreSQL database named `aoi_checklist`

### Initial Setup
Run `setup.sh` (or `setup.bat` on Windows) to install all frontend and backend dependencies:
```bash
chmod +x setup.sh
./setup.sh
```

### Environment Variables
1. **Server (`server/.env`)**:
   ```env
   NODE_ENV=development
   PORT=5001
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=password
   DB_NAME=aoi_checklist
   JWT_SECRET=aoi-checkpoint-local-secret
   # Default admin user created automatically on launch:
   AUTH_DEFAULT_USERNAME=abhinandan
   AUTH_DEFAULT_PASSWORD=95003989
   AUTH_DEFAULT_NAME="Abhinandan Kumar"
   ```
2. **Client (`client/.env`)**:
   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   ```

### Running the App
- **Backend**: Navigate to `server` and run `npm run dev` (starts on port `5001`).
- **Frontend**: Navigate to `client` and run `npm start` (starts on port `3000` and proxies `/api` requests to `5001`).

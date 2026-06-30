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
- Meta fields: `line`, `group_name`, `date`, `shift`, `responsible_person`, `time`, `submitted_by`.

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
- `barcode_read_a_pre_aoi` (VARCHAR(50))
- `barcode_read_b_layer` (VARCHAR(50))
- `barcode_read_b_spi` (VARCHAR(50))
- `barcode_read_b_pre_aoi` (VARCHAR(50))
- `workorder_info_pre_aoi` (VARCHAR(255))
- `workorder_info_post_aoi` (VARCHAR(255))
- `aoi_scan_tools_workorder_traceability` (VARCHAR(255))
- `confirmation` (VARCHAR(50))
- `submitted_by` (VARCHAR(150))

---

## 🔒 Authentication & Authorization Flow

1. **Tokens**: JWT is generated during login with an 8-hour expiry. It is saved in browser `localStorage` as `aoi_auth_token`.
2. **Interceptors**: Frontend API client (`client/src/services/api.js`) appends the bearer token in headers and intercepts `401 Unauthorized` responses to dispatch a logout event (`aoi-auth-expired`).
3. **Role-Based Access Control (RBAC)**:
   - `super_admin`: Can manage all users (create/edit/delete roles including other admins/super_admins).
   - `admin`: Can view user list and manage users with `inspector` or `technician` roles.
   - `inspector` / `technician`: Standard roles that fill checklists and generate reports but cannot access the User Management tab.

---

## 🧭 Routing & Navigation

The application uses **React Router (`react-router-dom`)** for handling page transitions, tab selection active indicators, and authorization guards:

1. **Router Context**: Wrapped with `<BrowserRouter>` inside [index.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/index.js).
2. **NavLinks**: Tabs in the navigation header use `<NavLink>` to assign `active` CSS states dynamically based on current paths.
3. **Route Mappings**:
   - `/`: Dashboard showing personal session logs (or all active sessions summary if role is `super_admin`).
   - `/checkpoint`: Daily Function Check entries.
   - `/checklist`: Technician Checklist entries.
   - `/reports`: Checksheet and Checklist query/export tables.
   - `/users`: User Management CRUD panel (only accessible if role is `super_admin` or `admin`).
   - `*` (any other route): Redirects automatically to `/` using `<Navigate to="/" replace />`.

---

## ⚠️ Known Issues & Technical Debt

### Resolved: Security & Access Control Enhancements (June 2026)
* **Access Control Vulnerability**: Enforced role authorization on user directory endpoints (`GET /auth/users` and `POST /auth/create-user`) by applying `requireRoles(['super_admin', 'admin'])`. Standard operators can no longer access user records or create accounts directly.
* **Brute-Force Prevention**: Integrated `express-rate-limit` on the `POST /auth/login` endpoint (10 requests per 15 mins per IP).
* **JWT Secret Warning**: Enforced console warnings if `JWT_SECRET` falls back to the local development default in production mode.
* **Pruned Duplications**: Removed all remaining duplicate route definitions (`/sessions/me`, `/sessions/all`, etc.) in `routes/auth.js`.

### Resolved: Input Validation & Sanitized Error Logging (June 2026)
* **Input Validation Layer**: Implemented `server/middleware/validation.js` validating format, types, and VARCHAR length bounds on user, checkpoint, and checklist requests to prevent DB constraint exceptions.
* **Exception Sanitization**: Masked backend database error leakage (crashes, Prisma messages, column metadata) with clean user-facing error response payloads.
* **Workorder Fields Validation Hotfix**: Fixed a `ReferenceError` during Technician Checklist submission by adding missing `workorder_info_pre_aoi` and `workorder_info_post_aoi` destructuring from `req.body` inside the `validateChecklist` middleware.

### Resolved: Self-Service Profile Update (June 2026)
* **Password Change Route**: Implemented `POST /auth/change-password` endpoint.
* **Password Dialog Component**: Added `ProfileModal` in React so standard operators can directly change their own passwords by clicking their profile badges in the header navbar.
* **Admin Self-Editing**: Enabled admins/super-admins to safely update their display names and credentials in User Directory while disabling self-role-demotion.

### Resolved: Aesthetic & Responsive Refinements (June 2026)
* **Modern Typography**: Configured Google Fonts **Inter** application-wide.
* **Glassmorphism Navbar**: Upgraded headers to utilize a translucent glass blur background with responsive borders.
* **Adaptive Grid Layout**: Replaced column stacks with a grid layout that keeps the header row horizontal on mobile while overflowing tabs into a scrollable horizontal drawer.

### Resolved: Reports & Export Formatting Enhancements (June 2026)
* **Chronological Date Constraints**: Integrated mutual Date input bounds on From/To selectors in Reports, preventing the To date from being set before the From date.
* **Submission Timestamp Tracking**: Added a "Submitted At" column displaying the precise system date & time of checklist/checksheet submission (derived from the database `created_at` timestamp).
* **Export Normalization**: Refactored exports (CSV & PDF) to map boolean checkpoint values to user-friendly "Yes" and "No" outputs (matching the Web UI layout instead of the previous "Checked"/"Not checked" labels).

### Resolved: Pre-AOI Barcode Read Integration (June 2026)
* **Database Extension**: Added `barcode_read_a_pre_aoi` and `barcode_read_b_pre_aoi` columns (`VARCHAR(50)`) to the `aoi_technician_checklist` table using Prisma schema changes and migration scripts.
* **Form Layout Refactoring**: Reconfigured the grid columns under "Barcode Read Information" in the React front-end from a 2-column layout to a 3-column layout (`form-grid-3`), adding the new **Read at Pre-AOI** dropdowns under both B Side and A Side checks.
* **Reporting & Exports**: Synced these new columns into the Reports display and all CSV/PDF export generation pipelines.

### Resolved: Submitted By Integration (June 2026)
* **Database Columns**: Added `submitted_by` VARCHAR(150) columns to both the checksheet (`AoiFunctionCheckpoint`) and checklist (`AoiTechnicianChecklist`) database tables.
* **Auto pre-filling & Session Tracking**: Configured the React client to automatically append the formatted `${fullName} (${username})` of the logged-in user context upon submitting checksheets, and pre-fill the read-only **Submitted By** field on the checklist Confirmation form.
* **Reports Synchronization**: Rendered the **Submitted By** column across both Daily Checksheets and Technician Checklists in the Reports section, fully supporting CSV exports and PDF generation.
* **Submission Lock on No Confirmation**: Disabled the Submit button in the checklist UI and enforced blocking logic in the submit handler if "All Information Correct?" is set to "No".

### Resolved: Reports Header Visual & UX Redesign (June 2026)
* **Before Layout**:
  * **Report Selector**: A native select dropdown (`Daily Function Checks` / `Technician Checklists`) was floated on the right side of the main title block, separated from the title by a large empty space.
  * **Export Action**: The Export select dropdown (`Choose format`) was embedded inside the filters panel row, causing mixed information architecture (mixing filters and action controls) and crowding the filter inputs.
* **Redesigned UX Layout**:
  * **Segmented Toggle**: Replaced the native select dropdown with a clean, segmented tab toggle button group situated directly under the title.
  * **Header Action Button**: Extracted the Export control from the filter row and elevated it to a primary page action button (dropdown menu) positioned in the top-right corner of the header.
  * **Dedicated Filter Card**: Cleaned up the filters grid to focus purely on search variables (From/To dates, Line, Shift, Group) and the Clear button.

### Resolved: Navigation Tab Reordering & Structure (June 2026)
* **Tab Order Swapped**: Placed the "Technician Checklist" navigation tab immediately after "Home" and before "Daily Function Check" (i.e. Home ➔ Technician Checklist ➔ Daily Function Check ➔ Reports ➔ User Management).
* **Router Synced**: Updated layout routing order in [App.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/App.js).

### Resolved: User Role Simplification & Operator Removal (June 2026)
* **Operator Role Removed**: Excluded the `operator` role from the User Management panel (`baseRoleOptions`). The system now displays and permits selecting only 4 active roles: `Superadmin`, `Admin`, `Inspector`, and `Technician`.
* **Prisma Mappings**: Retained database compatibility but restricted UI administrative creation/update inputs to the allowed roles.

### Resolved: Reports Ordering, Structured Grouping & Headers (June 2026)
* **Toggle Selection Order**: Reordered the reports toggle switcher so that "Technician Checklists" is the first/default report tab displayed and "Daily Function Checks" is shown second.
* **Submitted By Column Position**: Repositioned the "Submitted By" column inside the Technician Checklist report to render immediately after the "Submitted At" column.
* **Two-Row Grouped Headers**: Grouped the Technician Checklist table columns under their respective form card modules using a structured two-row grouped `thead` layout. Columns are visually organized under headers like `Pre-AOI Program`, `Stencil Serial No`, `Barcode Read Information`, `Workorder Info`, `AOI Scan Tools`, and `Confirmation`.

### Resolved: Comprehensive Mobile Responsiveness (June 2026)
* **Grid and Columns Optimization**: Form grid layouts (`.form-grid-2`, `.form-grid-3`, `.form-grid-4`, `.form-grid-6`) stack gracefully to single columns on devices under `768px` and `480px`.
* **Login Card Overlaps Prevention**: Modified margins, logo spacing, and selector alignment in [LoginPage.css](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/LoginPage.css) to eliminate overlaps on viewports down to iPhone SE widths (320px - 375px).
*   **Scrollable User Management Directory**: Added a responsive wrapper and horizontal scroll bar mapping in [UserManagement.css](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/UserManagement.css) to prevent operator tables from breaking container frames.

### Resolved: UI/UX & Profile Security Optimization (June 2026)
*   **Logout Button Relocation**: Relocated the logout button from the main header navigation menu into the user profile settings modal ([App.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/App.js) / [ProfileModal.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/ProfileModal.js)).
*   **Password Form Control Activation**: The current, new, and confirmation password inputs inside [ProfileModal.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/ProfileModal.js) are disabled by default. Clicking the `🔑 Change Password` activation toggle button enables the inputs and dynamically displays the "Update Password" submission control in the footer.
*   **Responsive Small Screen Header (<= 520px)**: Hides the text branding divider and logo title in [App.css](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/App.css) and displays the user profile tab button as a sleek circular avatar containing `👤` to prevent navbar overlaps on low-width viewports.
*   **Inactivity Auto-Logout Tracking**: Implemented a 15-minute global idle and visibility monitor in [App.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/App.js). Idle timeouts prompt a warning modal with an animated 30-second countdown progress bar. User interactions reset the session timer, while expiry triggers a session logout call to the backend.
*   **Query-Based Redirection Routing**: Utilizes React Router parameters to handle login redirection instead of inline component swapping. Unauthenticated routes redirect to `/login?redirect=...`, and successful login transitions back to the stored pathname, making the web application fully URL-driven.

### Resolved: Duplicate & Broken Routes in `server/routes/auth.js`
- **Status**: Fixed
- **Details**: The duplicate route registrations for `GET /auth/users` and `PUT /auth/users/:id` at the bottom of `server/routes/auth.js` have been removed. The authentication endpoints are now clean, optimized, and execute correctly.

### Resolved: QA Agent Plan Implementation (June 2026)
*   **FIX-1 – Footer Password Removed**: Replaced `"Designed & Maintained by Abhinandan Kumar (95003989)"` in the footer (the number was the super admin password) with `"AOI CheckPoint © 2026 Vivo"`.
*   **FIX-2 – Logout Clears Token + Hard Redirect**: `handleLogout` and session-expiry handler in [App.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/App.js) now call `authStorage.clearToken()` and use `window.location.href` (hard redirect) instead of `navigate()` to guarantee full React state teardown.
*   **FIX-3 – Success/Error Toast + Redirect**: Both form submission handlers in [TechnicianChecklist.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/TechnicianChecklist.js) and [FunctionCheckpoint.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/FunctionCheckpoint.js) show a green success toast and redirect to `/reports` after 1.5s. Errors show a red message and do **not** reset the form.
*   **FIX-5 – Disable Submit on Empty Required Fields**: Daily Function Check submit button is now `disabled={loading || !isFormValid}` where `isFormValid = line && group_name && shift && date`.
*   **FIX-6 – Full Name Asterisk**: Added `*` to the Full Name label in [UserManagement.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/UserManagement.js) create form.
*   **A11Y-1/2 – Form Label Accessibility**: All `<label>` elements in both form pages now have `htmlFor` attributes matching corresponding input `id` values. Checkbox inputs in Daily Function Check have `aria-label` attributes.
*   **UX-1/UX-2 – Password Show/Hide Toggle**: Eye-icon toggle buttons added to: login form ([LoginPage.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/LoginPage.js)), user management create form ([UserManagement.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/UserManagement.js)), and all three password fields in profile modal ([ProfileModal.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/ProfileModal.js)).
*   **UX-3 – Session Status Text**: Fixed `logged_out` → `Logged Out` display string in both session tables in [Home.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/Home.js).
*   **UX-7 – Forgot Password Placeholder**: Added `"Forgot password? Contact your administrator."` text below sign-in button in [LoginPage.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/LoginPage.js) (EN + ZH translations in [translations.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/translations.js)).
*   **UX-9 – UUID Truncation**: Session IDs in both session tables now display as first 8 characters + `…`, with full UUID on hover via `title` attribute.
*   **UX-11 – Confirm Password Field**: Added Confirm Password input to User Management create form with client-side match validation before submitting.
*   **UX-12 – Guard Last Super Admin Deletion**: Both frontend ([UserManagement.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/UserManagement.js)) and backend ([server/routes/auth.js](file:///Users/abhinandan/Documents/AOi_check_sheet/server/routes/auth.js)) now block deleting the only remaining `super_admin` account.

### Resolved: Footer Branding Update (June 2026)
*   **Brand Name**: Footer now reads **`AOI Digital Checksheet © 2026 Vivo`** (previously "AOI CheckPoint © 2026 Vivo") in [App.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/App.js).
*   **Designer Credit**: Added a second footer line — *"Designed, Developed & Maintained by Abhinandan Kumar"* — styled via the `.footer-credit` class in [App.css](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/App.css) (font-size `0.75rem`, muted slate-grey `#94a3b8`).

### Resolved: Login Page UX, Internationalization & Auth Handlers (June 2026)
*   **Language Switcher Re-alignment**: Relocated the language switcher to the top of the form panel to ensure visibility against a white background. Restructured `LanguageContext.js` with `useCallback` and `useMemo` to ensure translation reactivity on language change.
*   **Rebranding Logo & Metadata**: Replaced all remaining occurrences of 'AOI CheckPoint' with 'AOI Digital Checksheet' (including Chinese localization: 'AOI 数字化检查表') in headers, loading components, and the login brand row.
*   **Contextual Redirect Logout**: Split logout into `handleLogout` (manual logout to a clean `/login`) and `handleIdleLogout` (idle timeout/expiry redirect preserving the current URL checkpoint).
*   **API-Status-Driven Error Messages**: Replaced raw server errors on the login page with status-specific translated messages (Credentials error, Rate Limit, Network, and Server error). Bypassed interceptor auto-redirection on failed login attempts.
*   **Dev Mode Rate Limit Skip**: Configured the express login rate limiter to skip restriction in development modes (`process.env.NODE_ENV !== 'production'`).

### Resolved: Role-Based Form Submissions Restriction (June 2026)
*   **Inspector Read-Only Access**: Added a check in [TechnicianChecklist.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/TechnicianChecklist.js) and [FunctionCheckpoint.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/FunctionCheckpoint.js) to detect if `currentUser.role === 'inspector'`. When true, a status warning banner is rendered, and all form controls/submit buttons are disabled via an HTML5 `<fieldset disabled={isInspector}>` wrapper.
*   **Backend Role Verification**: Updated [server/routes/technicianChecklist.js](file:///Users/abhinandan/Documents/AOi_check_sheet/server/routes/technicianChecklist.js) and [server/routes/functionCheckpoint.js](file:///Users/abhinandan/Documents/AOi_check_sheet/server/routes/functionCheckpoint.js) `POST` endpoints to require `'technician'`, `'admin'`, or `'super_admin'` roles, throwing a 403 Forbidden to any `inspector` attempting to submit form payloads.

----

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

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
│   │   │   ├── ChangeoverChecksheet.js / .css # Changeover checksheet form
│   │   │   ├── PendingModule.js / .css      # Review/Approval workspace
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

### Components Map

- **`Login.js` / `LoginPage.js`**: Handle JWT authentication.
- **`Dashboard.js`**: Provide an overview of today’s metrics (e.g. submitted checks, line stops).
- **`FunctionCheckpoint.js`**: Daily functional check form (Checkpoints).
- **`TechnicianChecklist.js`**: Maintenance checklist form (Checklists).
- **`ChangeoverChecksheet.js`**: Form for recording AOI machine changeovers. 
- **`PendingModule.js`**: Interface for engineers to review and approve/reject Checkpoints, Checklists, and Changeovers.
- **`Reports.js`**: Comprehensive reporting interface for all forms with filtering and CSV/PDF export.
- **`UserManagement.js`**: RBAC controls for creating/updating users (Admin only).

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

### Recent Updates: UI Redesign & Pagination (July 2026)
* **Activity Logs Overhaul**: Transitioned Activity Logs from client-side array filtering to robust server-side offset pagination (`skip`, `take`, `count`) in Prisma. The UI was modernized to include 4 specific metric cards (TOTAL EVENTS, LOGINS, LOGOUTS, FAILURES) tracking Authentication events, utilizing a numbered `1 2 3...` sliding-window pagination design.
* **Review Forms UI Redesign (`PendingModule.js`)**: Modernized Checklist, Checkpoint, and Changeover review forms using grid layouts grouped into discrete CSS section cards (`.form-section-card`). 
  - Substituted basic HTML checkboxes with premium `.modern-toggle-slider` toggle switches in the Checkpoint form.
  - Unified the "Designated Engineer", "Confirmation", and "Technician Remarks" blocks into a consistent "Signatures & Approvals" footer across all forms.
* **Changeover Type Classification**: Expanded the Changeover checksheet schema and UI to include a "Changeover Type" dropdown containing: Model, Series, After Sale, Trial.
* **Line Status Sync**: Line Management status was decoupled from the Changeover forms natively; Changeover sync functionality was rewritten to focus purely on the new *Changeover Type* rather than interfering with global line metrics.
* **Engineer Approval Flow Fix**: Fixed an issue in `changeoverController.js` where Engineer "Disapprove" actions inadvertently marked submissions as "Approved".
* **Changeover Type Database Sync**: Mapped the `changeover_type` field in `server/models/ChangeoverChecksheet.js` to ensure the value selected by the technician is correctly persisted to the PostgreSQL database and retrievable by the engineer.
* **Review Modal UI Buttons**: Added missing CSS class styles for `.primary` and `.success` buttons in the `ConfirmModal`, and fixed logic to respect the `hideCancel` parameter.
* **Auto-Scrolling Native Validation**: Modified the submit buttons on all three checksheet forms to not be `disabled` while required fields are empty, enabling the browser's native HTML5 validation to intercept submissions, automatically scroll to the missing field, and prompt the user.

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
*   **Inspector Navigation and Route Blockage**: Updated [App.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/App.js) to hide navigation links to `/checklist` and `/checkpoint` for users with the `inspector` role, and blocked direct route access (automatically redirecting back to `/` if accessed directly).
*   **Backend Role Verification**: Updated [server/routes/technicianChecklist.js](file:///Users/abhinandan/Documents/AOi_check_sheet/server/routes/technicianChecklist.js) and [server/routes/functionCheckpoint.js](file:///Users/abhinandan/Documents/AOi_check_sheet/server/routes/functionCheckpoint.js) `POST` endpoints to require `'technician'`, `'admin'`, or `'super_admin'` roles, throwing a 403 Forbidden to any `inspector` attempting to submit form payloads.

### Resolved: Today's Line Submission Summary Dashboard (July 2026)
*   **Dual-Dataset Prefetch**: Refactored [Reports.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/components/Reports.js) to concurrently fetch both checklists and checkpoints via `Promise.all` on mount, allowing real-time cross-tab computations.
*   **Dynamic Metrics Calculation**: Computes submissions for both forms by filtering records matching the selected summary date against the official 25-line options array (`401` to `425`).
*   **Interactive Summary Date Pickers**: Replaced the static date badges inside the summary cards with interactive `.summary-date-picker` inputs. This lets users select any historical date to check which lines were submitted vs pending on that day.
*   **Summary Cards UI**: Implemented two premium summary cards (one for Technician Checklist, one for Daily Function Check) displaying:
    *   **Done vs Pending Counters** (e.g., `3 / 25`)
    *   **Dynamic SVG Progress Ring** showing completion percentage
    *   **Detail Pill Badges** showing the specific line numbers that are either Submitted (Green) or Pending (Gray).
*   **Localization Support**: Added translation mappings in [translations.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/translations.js) for all summary headers and tags.

### Resolved: Line Status Option (Production vs. Line Stop) (July 2026)
*   **Database Extension**: Mapped the `status` (`VARCHAR(50)`) field defaulting to `"Production"` to both `AoiFunctionCheckpoint` and `AoiTechnicianChecklist` database models.
*   **Backend Validation Bypass**: Updated `validation.js` middleware to bypass form questionnaire details and confirmation checks if `status === 'Line Stop'`.
*   **Frontend Segmented Controls**: Added status radios in checksheets rendering immediately after line selection. Selecting `Line Stop` collapses all questionnaire checks, prompting a visual alert card allowing immediate submission.
*   **Reports List Display**: Added the status column to the report tables, displaying green/red indicator badges. Bypasses other grid values and lists stopped line cells as `—`.

### Resolved: Submission Confirmation Modal Redesign (July 2026)
*   **Overlay Modals**: Replaced native browser `window.confirm` blockers in Technician Checklists and Daily Function Checks with a fixed, centered, overlay viewport dialog (`global-modal-overlay` with a frosted blur backdrop-filter).
*   **Checklist Data Verification Grid**: Renders a details list showing selected Line, Group, Date, Shift, and Line Status for visual parameters verification before submitting.
*   **Caution Locks**: Includes a warning box informing operators that once submitted, checksheet files are locked and cannot be edited.

### Resolved: Chronological Sorting in Sessions & Reports (July 2026)
*   **Active Sessions Sorting**: Configured the "All Active Sessions by User" dashboard table to sort by the users' `last_login` timestamp in descending order, showing the most recently active users first.
*   **User Session Log Sorting**: Sorted the user's personal session log history and active sessions nested list by `login_time` in descending order.
*   **Reports Submission Sorting**: Sorted both Daily Function Checks and Technician Checklists report records by `created_at` timestamp in descending order, displaying the newest entries first in the Web UI and propagating this sorted sequence to CSV and PDF exports.
*   **Backend Database Ordering**: Updated the database model `getAll` queries for both checkpoints and checklists to order by `created_at: 'desc'` rather than `date: 'desc'`, ensuring a consistent and performance-optimized database retrieval ordering.

### Resolved: Full Screen Fluid Responsiveness & Layout Alignment (July 2026)
*   **Fluid Screen-Filling Dashboards**: Updated the navbar (`.navbar-container`), Home page (`.home-container`), and Reports page (`.reports-container`) to span `100%` width with `2rem` side padding on desktop viewports, removing the wide empty margins on high-resolution screens.
*   **Centralized Spacing Rules**: Moved the desktop and mobile screen margin rules to the parent `.main-content` wrapper (`padding: 1rem 2rem 2rem 2rem` on desktop, `padding: 1rem` on mobile) to guarantee perfect horizontal alignment across all views.
*   **Spacious Centered Forms**: Constrained the inputs inside the checklist form (`1000px`), checkpoint form (`1200px`), and user management card (`1200px`) to prevent them from stretching too wide, maintaining clean readability on high-res displays while keeping them centered.
*   **Clean Mobile Breakpoints**: Configured mobile styles to set all child page containers to `width: 100%; max-width: 100%; padding: 0;` on viewports under `768px` so they render properly.

### Resolved: Unified Checksheet Hub UX Redesign (July 2026)
*   **Architecture Update**: Combined all three checksheet entry points (`TechnicianChecklist`, `FunctionCheckpoint`, `ChangeoverChecksheet`) into a single, unified React parent component (`ChecksheetHub`).
*   **Navigation Cleanup**: Removed the individual form links from `App.js` and replaced them with a single `Checksheets` navigation link (`/checksheets`). This significantly declutters the top navigation bar.
*   **Premium Tabbed Interface**: The new Hub page features an elegant pill-tab interface (`ChecksheetHub.css`), allowing technicians to switch seamlessly between forms instantly without page reloads.
*   **State & Hash Syncing**: Implemented hash-based routing inside the hub (`#checklist`, `#checkpoint`, `#changeover`) so that active tabs are preserved on refresh or bookmarking.

### Resolved: Changeover Checksheet Module (July 2026)
*   **Database Log Model**: Created the `ChangeoverChecksheet` model inside `schema.prisma` with 24 specific checkpoint fields mirroring the Excel template. Applied migrations and integrated CRUD backend controllers.
*   **Frontend Checksheet Form**: Implemented `ChangeoverChecksheet.js` using the standard layout with the unique checkpoints.
*   **Approval Workflow**: Expanded `PendingModule.js` to include a "Changeover Checks" tab, allowing Engineers to review, edit, approve, and reject Changeovers.
*   **Unified Reports**: Integrated Changeover Checksheets directly into the `Reports.js` interface as a third toggle tab, leveraging the same exporting and UI structure.

### Resolved: Reports Dashboard Split Status Counts (July 2026)
*   **Production & Line Stop Metrics**: Expanded the summary dashboard cards in Reports to split "Submitted" counts into separate, color-coded "Production" (Green) and "Line Stop" (Red) metrics.
*   **Not Filled (Pending) Category**: Labeled and styled the remaining unsubmitted lines count as "Not Filled" (Gray) to clearly represent what's missing for the selected day.
*   **Segmented Line Breakdown Chips**: Refactored the line chip lists under both checklist and checkpoint cards to display in three distinct sections: Production lines, Line Stop lines, and Not Filled lines, making it easy to identify the exact status of each line at a glance.
*   **Internationalization Support**: Added EN/ZH translation keys in `translations.js` for "Production", "Line Stop", and "Not Filled" summary dashboard headers.

### Resolved: Footer Link Redirection & Login Page Footer (July 2026)
*   **Redirect Click Handler**: Wrapped the developer name "Abhinandan Kumar" in a styled clickable anchor link. Clicking it opens the local API link (`http://localhost:8951/?action=talkapi&toUserCode=95003989`) in a new tab, listens to a message event, and uses a fallback timer of 2.5 seconds to auto-close the tab once the action has triggered.
*   **Login Page Footer Integration**: Structured the login layout container to display the footer clearly at the bottom of the login page. Set the login background and flex styling so it remains visible immediately without scrolling.
*   **Aesthetic Styling**: Added link colors, hover decoration states, and custom styles inside `App.css` and `LoginPage.css` to keep the footer appearance consistent across authenticated and public states.

### Resolved: Login Page Layout & Vertical Centering (July 2026)
*   **Vertical Center Alignment**: Introduced a custom `.login-main-content` flex wrapper layout inside `App.js` for the public login route. This isolates the login page from main app content blocks, enabling vertical centering on all desktops, laptops, and tablets.
*   **Height Constraints & Scroll Prevention**: Styled `.login-main-content` and updated `.login-page` in `LoginPage.css` to use flex box rules instead of hardcoded `min-height: 100vh`. This ensures the card centers perfectly in the remaining viewport height, keeping the footer at the bottom of the screen without scrollbars.

### Resolved: System Activity Log & Audit Trail Page (July 2026)
*   **Database Log Model**: Created the `AppActivityLog` model inside `schema.prisma` mapping to the `app_activity_logs` database table. Executed dev migrations to add the table in PostgreSQL and regenerated the Prisma client.
*   **Real-time Operations Logging**: Integrated a centralized `logActivity` logger. Records successful logins, failed logins (capturing attempted usernames and specific failure reasons like invalid password/user), regular logouts, session revocations, and daily checklist/checkpoint submissions with line/group metadata. Strips the `::ffff:` IPv6 prefix to display clean IPv4 addresses.
*   **Row-Level Access Security**: Implemented role-based filters on the `/api/activity-logs` endpoint. `super_admin` and `admin` roles can query all activity logs, while normal roles (technicians, inspectors) can only retrieve their own activity history.
*   **Frontend Dashboard Page**: Created the `ActivityLog` tab and route (CN: `系统日志` / EN: `Activity Logs`) in React, globally accessible to all roles. Hides the username search input for non-admin accounts. Includes paginated table views, dropdown filters by activity type, and colored status pill badges (incorporating a new gray badge for logout actions).

### Resolved: IIS Production Hosting & Windows Service Backend (July 2026)
*   **Static React Build**: Compiled frontend production files under `client/build` pointing directly to the backend API (`http://localhost:5001/api`).
*   **IIS URL Rewrite Configuration**: Created `web.config` inside `client/public` to rewrite React routing URLs (like `/reports`, `/logs`), ensuring refreshes do not return 404 errors on IIS.
*   **Windows Startup Task Service**: Registered a permanent task `AOI-Backend-Service` in Windows Task Scheduler under `NT AUTHORITY\SYSTEM`. Automatically starts the backend server on port 5001 at machine boot, completely hidden.

### Resolved: Reports Page Export & Filtering Enhancements (July 2026)
*   **Custom Export Confirmation Modal**: Swapped out the default browser `window.confirm` popup with a styled React modal window (`submit-confirm-modal`), incorporating an animated transition, status headers, action buttons, and a grid summary of export targets (report type, file format, total records, and active filter parameters).
*   **Export Dropdown Interaction Fix**: Repositioned the absolute dropdown container flush with the trigger button (`top: 100%` in `Reports.css`) to eliminate the 6px empty gap. This resolves the bug where moving the cursor over options triggered `onMouseLeave` and closed the menu prematurely.
*   **Default Date Filtering**: Programmed the `filters` initial state in `Reports.js` to default the `from` and `to` values to today's date (`YYYY-MM-DD`). Allows users to search other dates, and click "✕ Clear" to view all historical data.

### Resolved: User Management Redesign & Schema Expansion (July 2026)
*   **Database Schema Migration**: Added optional `email` (VarChar(150)) and `phone` (VarChar(50)) fields to the `AppUser` model in `schema.prisma`. Generated and ran database migrations, updating the PostgreSQL tables and generating the Prisma Client.
*   **Backend Controller Updates**: Modified auth routes (`/auth/create-user`, `/auth/users/:id`, and `/auth/users`) to read, write, validate, and return the new `email` and `phone` values, along with account creation timestamp `created_at`.
*   **Top Summary Stat Cards**: Added a dashboard of statistics cards displaying metrics: Total Users, Active (users with live sessions), Inactive (offline users), and Admins (users with admin/super admin roles).
*   **Modern Pagination & Quick Search**: Integrated a page sizing selector (defaulting to 10 entries per page), dynamic pagination buttons, and a quick text search bar filtering username, fullname, email, phone, or role in real-time.
*   **Mockup Table Redesign**: Restructured columns to match layout: user avatars (initials avatar circle with deterministic color theme based on name), email, phone, role pills, status pills (Active/Inactive), created timestamp, last login timestamp, and styled edit/password/delete action buttons.
*   **Modal Form Overlays**: Relocated the User Creation, User Details Update, and Password Reset forms into distinct, styled modal overlay dialogs (`global-modal-overlay`).

### Resolved: Homepage Metrics Redesign & Today's Submissions (July 2026)
*   **Dashboard Stats Endpoint**: Built `/api/auth/dashboard-stats` (GET) endpoint that queries the `AoiFunctionCheckpoint` and `AoiTechnicianChecklist` tables in PostgreSQL, filtering for the current local date (midnight). Returns counts grouped by shift (Day/Night) and unique active groups (Group A, B, C, etc.).
*   **Welcome greeting redesign**: Restructured header greeting to match mockup: WELCOME BACK subtitle (prefixed with an elegant vector gold star `✦` bullet rather than sparkles emoji), user fullname with greeting wave icon perfectly aligned to the text baseline, current local date badge, and user security role badge.
*   **Mockup Gradient Cards**: Implemented 4 modern stats cards on the homepage with custom tuned vibrant gradients (luxury indigo, ocean sky blue, modern rose-coral pink, and sunset orange gold) matching modern visual aesthetics:
    - **Today's Checklists** (Purple): count of Technician Checklists submitted today, with shift details.
    - **Today's Checksheets** (Blue): count of Daily Function Checks submitted today, with shift details.
    - **Active Groups** (Rose): count of unique active groups today, with scrollable group breakdown text (e.g. `A: 3 | B: 2`).
    - **Total Submissions** (Orange): combined sum of all today's submissions with Day/Night totals.

### Resolved: Activity Logs Page Redesign & Endpoint Joining (July 2026)
*   **Log User Details Mapping**: Enhanced the `/api/activity-logs` GET controller to perform a dynamic in-memory lookup joining logs with the `AppUser` model based on usernames. This resolves and returns the corresponding `full_name` and `email` properties for each log entry.
*   **Activity Logs Metrics Dashboard**: Implemented 4 summary metrics cards at the top of the activity logs page showing:
    - **Total Events** (Purple): total count of all activity logs in the system.
    - **Logins** (Green): count of successful user login events.
    - **Daily Checklists** (Blue): count of Daily Technician Checklists submitted today (local date).
    - **Daily Checksheets** (Rose): count of Daily Function Checkpoints submitted today (local date).
*   **Log Filter Panel**: Redesigned the filter toolbar to include an interactive dropdown list of system users (fetched dynamically from the database), filter type selector, start and end date range Pickers, and Apply / Clear action buttons.
*   **Mockup Table Redesign**: Formatted the logs table to display split date/time vertical stacks, user avatars (initials avatar circle with name and email stacks), colorful custom activity pills, entity labels, and description truncations.
*   **Detailed Log Modal View**: Added a click action on the far-right Details column that triggers a styled modal overlay popup window displaying full structured log details.

### Resolved: Reports Page Summary Card Colors and Labeling (July 2026)
*   **Production to Submitted Labeling**: Renamed the `PRODUCTION` summary column and line breakdown headers to `SUBMITTED` (mapped to localized key `rep_summary_submitted` in translations), representing checklist and checksheet submissions.
*   **Color Alignment**: Tuned summary states and chip colors:
    - **Submitted**: Styled in green (`#10b981`).
    - **Line Stop**: Changed from red to warning amber/orange (`#f59e0b`).
    - **Not Filled**: Changed from gray to error red (`#ef4444`).

### Resolved: User Management Header Overlap Bug Fix (July 2026)
*   **CSS Class Namespace Scoping**: Found that the `.header-left` styling class added globally in `ActivityLog.css` was colliding with the `.header-left` wrapper container on the User Management page. Scoped the `.header-left` styling rules inside `ActivityLog.css` under the `.table-card-header` namespace. This immediately resolves the styling leakage, restoring the correct vertical layout hierarchy for the header elements on the User Management page.

### Resolved: Typography Color Redesign for Page Headings (July 2026)
*   **Premium Gradient Headings**: Replaced the raw slate-black (`#0f172a`) color on all main page headings (`h1` elements) with a modern, high-end text gradient. The gradient starts at a deep sapphire-navy (`#0b1a30` 10%) and shifts smoothly to the primary brand blue-violet (`#415fff` 100%), matching the navbar logo and active tab styling guidelines perfectly.
*   **Affected Files**: Updated styles in `Home.css`, `UserManagement.css`, `ActivityLog.css`, `Reports.css`, `TechnicianChecklist.css`, and `FunctionCheckpoint.css`.
*   **Fallback Contrast**: Defined `#1e3a8a` as a solid text color fallback for rendering compatibility in older web browsers.

### Resolved: One-Submission-Per-Shift Restriction & Super Admin Deletion (July 2026)
*   **Duplicate Submission Enforcement**: Integrated a duplicate check (`checkDuplicate`) inside the `TechnicianChecklistController.js` and `FunctionCheckpointController.js` creation routes. When a user attempts to submit a checklist or checksheet, the backend queries the database for any matching combination of date, line, and shift. If found, a `400 Bad Request` duplicate error is returned and displayed on the client.
*   **Super Admin Deletion Endpoints**: Registered secure backend DELETE routes `/api/checklist/:id` and `/api/checkpoint/:id` mapped to the controllers' `deleteChecklist` and `deleteCheckpoint` methods. These endpoints are strictly protected to authorize only `super_admin` users.
*   **Frontend Action Column**: Refactored the `CheckpointReport` and `ChecklistReport` tables in `Reports.js` to render an "Actions" column containing a trash icon button (`🗑️`) when logged in as a `super_admin`. Prompts a modal-style confirm warning before executing the deletion call and refreshing the report dashboard list.

### Bug Fix: Reports Page currentUser Prop (July 2026)
*   **Root Cause**: `Reports.js` was attempting to read the logged-in user from `localStorage.getItem('user')`. However, the app **never writes the user object to localStorage** — it only stores the JWT token under the key `'aoi_auth_token'`. The user object lives exclusively in React state inside `App.js`. This caused `isSuperAdmin` to always evaluate to `false`, permanently hiding the Actions column.
*   **Fix Applied**:
    *   `App.js` → Updated the `<Reports />` route to pass `currentUser={user}` as a prop.
    *   `Reports.js` → Changed function signature from `Reports()` to `Reports({ currentUser })` and removed the broken `useState`/`useEffect`/`localStorage` block entirely. The `isSuperAdmin` flag is now derived directly from the received prop: `currentUser?.role === 'super_admin'`.
*   **Key Rule**: Always pass the logged-in user via props from `App.js`. Never attempt to read it from `localStorage` in a child component — it will not be there.

### Resolved: User Management Action Icons & IIS Reverse Proxy Fix (July 2026)
*   **User Action Buttons Redesign**: Replaced the solid background buttons and emojis (`✏️`, `🛡️`, `❌`) in the User Management list table with clean outline buttons:
    *   **Edit**: Pencil SVG with an orange border (`#fed7aa`) and orange text (`#ea580c`).
    *   **Reset Password**: Shield/Keyhole SVG with a blue border (`#bfdbfe`) and blue text (`#2563eb`).
    *   **Delete**: Cross SVG with a red border (`#fecaca`) and red text (`#dc2626`).
    *   **Micro-Interaction Hover States**: Added smooth hover transitions with soft background and border color shifts (e.g. orange background `#fff8f1` on edit hover).
*   **IIS Reverse Proxy URL Rewrite Rule**: Added the missing `API Proxy` rewrite rule to both the active deployment **[client/build/web.config](file:///d:/AOi_check_sheet/client/build/web.config#L6-L9)** and the template source **[client/public/web.config](file:///d:/AOi_check_sheet/client/public/web.config#L6-L9)**. This rule correctly forwards all requests matching `^api/(.*)` to the Node backend on `http://localhost:5001/api/{R:1}` on port 5001, resolving the HTTP 500 / 404 login error on IIS port 3000.

### Resolved: Line Management Module & Status Filtering (July 2026)
*   **Database Schema Migration**: Added `LineStatus` model to track physical line installation statuses (e.g. Lines 409, 414, 416-420 are marked "Not Installed" by default).
*   **Line Management Page**: Created a dedicated `LineManagement.js` panel available exclusively to `super_admin` and `admin` roles, displaying interactive toggle cards for all 25 lines.
*   **Form Integration**: Refactored the `Daily Function Checks` and `Technician Checklists` line dropdowns to only display lines that are actively marked as "Installed".
*   **Reports Status Filtering & Dummy Rows**: Integrated a "Status" filter in `Reports.js` allowing operators to sort by *Production*, *Line Stop*, *Not Filled*, and *Line Not Installed*. Enhanced the Reports engine to inject logical "dummy rows" dynamically for unsubmitted lines based on their actual installation status.
*   **Activity Logs Tracking**: Bound the Line Management backend toggles to the central Activity Logger. Toggling a line dynamically pushes a `LINE_STATUS_UPDATE` action to the system audit logs, ensuring complete traceability of line enable/disable events.
*   **UI Bugfixes**: Fixed the Reports table so that dummy rows correctly render their literal status ("Not Filled" or "Not Installed" pills) rather than mistakenly rendering as "Production". Re-aligned the Home page header tags and Reports filter flex-grid to perfectly wrap and accommodate the new fields gracefully on all devices.

### Resolved: Home Dashboard UI Modernization & Security (July 2026)
*   **Routing & Open Redirect Fix**: Changed the root dashboard route to `/home` (auto-redirecting from `/`). Hardened the `handleLogin` logic in `App.js` to strictly enforce relative redirect paths, mitigating an open redirect vulnerability.
*   **Recent Submissions Widget**: Built a detailed, responsive "Recent Submissions" card for the Home page that displays the last 10 checklist/checksheet activities.
    *   **UI/UX Design**: Uses a clean, CSS Grid-based layout for each list item. Displays professional SVG icons for submission type (Daily Function Check vs Technician Checklist), Line number, Shift, Group, Status (with color-coded badges), Submitter avatar/name, and IP address.
    *   **Backend Fix**: Fixed a Prisma ORM `500 Server Error` crash in `/api/activity-logs/recent-submissions` by correcting the query filter parameter from `action` to `activity_type`.
*   **Pagination & Navigation Controls**:
    *   Added a "View All" link to the Recent Submissions card header that instantly navigates to the full Reports module.
    *   Implemented client-side pagination (10 rows max per page) for the "Active Sessions by User" (Super Admin) and "My Active Sessions" (Technician) tables with "Previous" and "Next" controls.
*   **Layout Reversion**: Adjusted the `.dashboard-content` wrapper in `Home.css` from a side-by-side grid to a stacked vertical flex column layout (`display: flex; flex-direction: column`) to give the wide submission and session tables sufficient breathing room.

### Resolved: Unified Confirm Modals & Activity Log Stats Sync (July 2026)
*   **Unified Modal Component (`ConfirmModal.js`)**: Eliminated all blocking, unstyled native browser `window.confirm()` popups across the application. Built and integrated a unified React `<ConfirmModal />` component with glassmorphism backdrops, smooth slide-up animations, and distinct styling for warning vs. danger actions.
*   **Component Refactors**: Integrated the `<ConfirmModal />` into `Home.js` (for revoking active sessions), `Reports.js` (for Super Admins deleting historical Checkpoints/Checklists), and `UserManagement.js` (for deleting users).
*   **Activity Logs Stats Fix**: Fixed a bug where the "Daily Checklists" and "Daily Checksheets" summary cards on the Activity Logs page were erroneously displaying high numbers after a Super Admin deleted a record from the database. The issue was caused by the UI counting immutable `SUBMIT` logs instead of actual database records. Fixed by syncing `ActivityLog.js` to securely query the true `apiService.getDashboardStats()` endpoint just like the Home and Reports pages.

### Resolved: Day/Night Shift Separation & Automatic Time Reference (July 2026)
*   **Automatic Shift & Work Date Pre-filling**: Added a utility `getShiftAndDate()` in both **[Technician Checklist](file:///d:/AOi_check_sheet/client/src/components/TechnicianChecklist.js)** and **[Daily Function Check](file:///d:/AOi_check_sheet/client/src/components/FunctionCheckpoint.js)** forms to dynamically calculate the correct shift and business work date based on the system local time:
    *   *Day Shift*: `09:00 AM` to `08:59 PM` local time (calendar date `D`).
    *   *Night Shift*: `09:00 PM` to `08:59 AM` of the next day (maps to calendar date `D` if submitted before midnight, and `D - 1` if submitted after midnight).
*   **UI Input Locking**: Disabled the date and shift input controls on the UI to lock them to the auto-calculated values, preventing manual entry mistakes by operators.
*   **Day and Night Shifts Separation in Reports Table**: Refactored the `rows` useMemo in **[Reports.js](file:///d:/AOi_check_sheet/client/src/components/Reports.js)** to yield separate Day and Night shift entries for every line and date. Missing shifts are now correctly exposed as `"Not Filled"` dummy rows rather than being hidden.
* * **Dynamic Shift Selector in Summary Cards**: Integrated a Shift dropdown in both Checklist and Checkpoint status summary cards on the Reports page, defaulting to the current shift and filtering all metrics and line breakdowns dynamically.

### Resolved: Engineer Approval Flow, Pending Tasks & Reports UX Overhaul (July 2026)
* **Designated Engineer Flow**: Added a `Designated Engineer` select dropdown and `Remarks` text box on checklist and checkpoint submission forms. Technicians must select a designated engineer when submitting checksheets.
* **Pending Tasks Workspace (`PendingModule.js`)**:
  * Engineers log in to see a prioritized list of checklists/checkpoints designated to them.
  * Engineers can approve (remarks optional) or disapprove (remarks mandatory) submissions.
  * Technicians see disapproved tasks returned to their pending queue with the engineer's rejection remarks, allowing inline corrections and resubmission.
  * **Full-Screen Workspace Focus**: Redesigned the review drawer overlay to a beautiful full-screen modal container matching high-end dashboard design principles.
* **Modification Audit Trail**: When an engineer edits checksheet parameters during review, the backend automatically compares the values against the original submission and stores a detailed modification audit trail.
* **Compact High-Density Reports UX**:
  * Consolidated 20+ columns into a clean 6-column layout on the Reports page. Sticky left column displays Line, Date, Group, and Shift badge.
  * Barcode verifications display green checks (`✓ LASER`, `✓ SPI`, `✓ PRE-AOI`) or red crosses (`✗ LASER`, `✗ SPI`, `✗ PRE-AOI`) instead of raw text.
  * Pre-existing checklist/checkpoint submissions (where `designated_engineer_id` is blank) fallback to show as approved by `"System (Automatic)"`.
* **Exclusion of Uninstalled Lines**: Reports logic omits generating missing shifts dummy rows for inactive, uninstalled lines.
* **Dynamic Line Stop Hiding**: During engineer review of line stop checksheets, detailed input fields are collapsed by default. A status toggle allows promoting the checksheet to `"Production"`, which dynamically expands the edit panels.
* **Technician Submission Modals**: Standard form submissions now trigger an interactive confirmation modal, and successful database writes display a success modal requiring user close acknowledgement before resetting the form.
* **Modification Diffs Styling & Indicators**:
  * Renamed barcode labels from `Barcode Read A/B Layer` to `Barcode Read A/B Laser` in the engineer review forms.
  * Added visual pencil indicators (`✏️ Edited` badges) on individual table cells (Line Status, Program & Tooling, Barcode Verifications, Workorders & Traceability, Function Checks, etc.) when the engineer has modified any technician-submitted values.
  * Overhauled the Change History drawer card design, mapping database raw keys to localized human-readable labels (e.g. `pre_aoi_program_full_name` -> `Pre-AOI Program Name`) and displaying modifications as stylized clean gray items with colored strike-throughs and status tags.
* **Line Status & Doc Status Column Separation**:
  * Split the unified reports status pill into two separate columns: **Line Status** and **Doc Status**.
  * **Line Status** displays only `Stop` in red (`#fff5f5` background, `#e53e3e` text, `#fed7d7` border) or `Production` in green (`#f0fdf4` background, `#166534` text, `#bbf7d0` border) for active/filled submissions, and `—` for empty rows.
  * **Doc Status** renders the document approval state: `Not Filled` (crimson), `Review` (warning yellow/amber), `Disapproved` (crimson), and `Approved` (green).
* **Navigation & Authorization Refinements (July 2026)**:
  * **Tab Order Redesign**: Swapped header nav order so that **User Management** is placed immediately *after* **Line Management** and *before* **Activity Logs** (Home ➔ Pending Tasks ➔ Technician Checklist ➔ Daily Function Check ➔ Reports ➔ Line Management ➔ User Management ➔ Activity Logs).
  * **Engineer User Management Capabilities**:
    * Enabled the `engineer` role to view, create, edit, and delete users on the User Management page (both frontend routes and backend endpoint guards).
    * Restricted role assignability for engineers to only `inspector` and `technician` roles. They cannot create/edit administrators or engineers.
    * Expanded engineer visibility to include activity logs of technician, inspector, and other engineer accounts.
    * **Line Management Access Exclusion**: Line Management access remains strictly restricted to only `admin` and `super_admin` roles (engineers do not have permission to view the tab or toggle line installation status).
  * **Default Today's Date Filters for Activity Logs**:
    * All user roles now view today's activity logs by default on page load (dates pre-filled to today's date).
    * **Inspector, Engineer, Technician** can check logs for other dates via date pickers, but they cannot clear the date filter entirely. If cleared, inputs fall back to today's date.
    * **Admin & Super Admin** also load today's logs by default, but retain the option to clear filters entirely to view "All Data".
    * **Engineer User Filter Dropdown**: Unlocked the USER filter dropdown for the `engineer` role, allowing them to filter logs by other users. The dropdown options list for engineers excludes `admin` and `super_admin` accounts. Backend queries also strictly omit returning admin or super_admin activity logs to engineers.
  * **Engineer Checklist & Checksheet Form Submission**: Authorized the `engineer` role to fill and submit both the **Technician Checklist** (`/checklist` POST route) and the **Daily Function Check** (`/checkpoint` POST route) on both frontend layouts and backend endpoints.
  * **Health Check & Reverse Proxy Compatibility**: Moved the anonymous `/api/health` check endpoint definition before any authenticated Express routes. This prevents IIS URL Rewrite reverse proxies and health probes from receiving 401 Unauthorized blocks, ensuring correct health status reporting.
    * Packaged the Express server into a native Windows Service named **`AOI_Digital_Checksheet`** (managed by `node-windows`).
    * Created `install-service.js` and `uninstall-service.js` setup helpers inside the `server/` directory.
    * Deleted the legacy startup shortcut (`AOI-Server.lnk`) from the Windows Startup folder to prevent double-execution port conflicts on user login.

### Resolved: Pending Tasks Visibility & Reports Sorting Enhancements (July 2026)
* **Reports Page Dynamic Sorting**:
  * Added a default sorting logic prioritizing **Latest Submissions** (`created_at` timestamp descending).
  * Injected a `Sort By` dropdown into the filters panel to allow toggling between *Latest Submissions* and the legacy *Line Ascending* mode.
  * Rebalanced the CSS grid template for `.report-filters` from a rigid 6-column to a uniform 4-column layout (`repeat(4, 1fr)`), allowing all 8 elements (7 inputs + 1 clear button) to elegantly wrap into exactly two even rows.
* **Smart Pending Tasks Visibility**:
  * Added a global `pendingCount` state watcher in `App.js` that periodically queries the backend (every 30s) to monitor the logged-in user's precise queue of pending checklists and checkpoints.
  * The **Pending Tasks** navigation tab is now entirely hidden if the user has `0` pending checks assigned to them, decluttering the UI for inactive periods.
  * Added a dynamic red notification badge displaying the total pending count directly on the navigation tab.
* **Strict Admin/Engineer Workflow Scoping**:
  * **Designated Engineer Column**: Exposed a new `Designated Engineer` column inside the `PendingModule.js` tables, utilizing the `getEngineerDisplay` helper to visibly show Admins exactly *who* the checksheet is waiting on.
  * **View Only Admin Mode**: Revoked the `Approve/Reject` action buttons for `admin` and `super_admin` roles to enforce process compliance (admins shouldn't bypass the designated engineer). The buttons are replaced by a **"View Only"** action that opens the drawer strictly in read-only mode, disabling the engineer remarks textarea and hiding approval buttons.

### Resolved: Activity Log Details Modal UI Overhaul (July 2026)
* **High-Contrast Dark Shadow Design**: Redesigned the Log Details Modal container with a solid pure white background (`#ffffff`), sleek rounded corners (`border-radius: 20px`), a modern subtle border, and deep shadows (`0 25px 50px -12px rgba(15, 23, 42, 0.18)`) to block out background table grids and make overlay text 100% legible.
* **Premium Dashboard Header/Footer Styling**: Wrapped modal headers and footers with a light grey dashboard styling (`background: #f8fafc`) and subtle bottom/top borders, separating action elements cleanly.
* **Enhanced Visual Fields Layout**: Styled detail field rows with clean typography, styled `code` wrappers for client IP and username values, and centered a modern flat grey close button (`btn-modal-close`) at the bottom. Added modal scale-in micro-animations on popup activation.

### Resolved: Dashboard Submissions Pagination & View All Modal (July 2026)
* **Stats Day Submissions Filter**: Modified the Home page Recent Submissions widget to display submissions belonging specifically to the selected Stats Day (defaulting to today's date) instead of a fixed overall history slice of 10 items.
* **Dashboard Submissions Pagination**: Implemented client-side pagination controls (max 10 items per page) for the Recent Submissions list to prevent long page scrolls and maintain a compact grid layout. Overrode the `.page-nav-btn` layout styles in `Home.css` with flexible padding, auto-width, and `white-space: nowrap` rules to prevent `Previous`/`Next` text wrapping and overlapping.
* **Filterable View All Overlay Modal**: Replaced the "View All" link redirection to Reports with a premium **All Submissions Modal** overlay (`view-all-submissions-modal`). This modal queries the backend dynamically and features:
  * Full filter criteria (Date, Line, Shift, Group, and Activity Type).
  * Server-side paginated results tables with high-density columns.
  * Backend SQL `LIKE`/`contains` query filtering for unstructured string detail parameters.

### Resolved: Git Branch Policy Constraint (July 2026)
* **Branch Security**: Defined system memory and workspace rules prohibiting direct commits to the `main` branch. All feature developments must be executed on a separate feature or development branch before merging, preventing unstable code in the production-ready main branch.

### Resolved: Login Rate-Limiter Reverse Proxy Validation Fix (July 2026)
* **IP Address Sanitization**: Created a helper function `getCleanIp` in `server.js` that extracts and sanitizes the remote IP address, discarding any client port numbers (e.g. `10.172.130.189:11416` -> `10.172.130.189`) forwarded by the IIS reverse proxy. This prevents unhandled validation crashes in `express-rate-limit` (`ERR_ERL_INVALID_IP_ADDRESS`) during login attempts, restoring login system availability.

* **Native Windows Service Migration**:
  * Packaged the Express server into a native Windows Service named **`AOI_Digital_Checksheet`** (managed by `node-windows`).
  * Created `install-service.js` and `uninstall-service.js` setup helpers inside the `server/` directory.
  * Deleted the legacy startup shortcut (`AOI-Server.lnk`) from the Windows Startup folder to prevent double-execution port conflicts on user login.

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

### Production Server Startup (Windows — `vivoadmin` machine)
The production server on the `vivoadmin` machine is configured to start automatically and permanently as a native Windows Service named **`AOI_Digital_Checksheet`**.

* **Windows Service**: `AOI_Digital_Checksheet`
  * Runs in the background automatically at system boot (before a user logs in).
  * Managed via the standard Windows Services manager (`services.msc`) or PowerShell commands.
  * Automatically restarts if the Node.js process crashes.

* **Manage the service manually (elevated PowerShell)**:
  * **Start**: `Start-Service -Name "AOI_Digital_Checksheet"`
  * **Stop**: `Stop-Service -Name "AOI_Digital_Checksheet"`
  * **Restart**: `Restart-Service -Name "AOI_Digital_Checksheet"`

* **Setup Helpers** (stored in the `server/` directory):
  * `install-service.js`: Runs `node install-service.js` to register the service.
  * `uninstall-service.js`: Runs `node uninstall-service.js` to remove the service.

* **Verify server is running**: Check that port `5001` is listening:
  ```powershell
  Get-NetTCPConnection -LocalPort 5001 -ErrorAction SilentlyContinue
  ```
  If it returns a row with `State = Listen`, the server is up.

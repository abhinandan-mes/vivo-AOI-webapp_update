# AOI CheckPoint - Project Summary

## Executive Summary
**AOI CheckPoint (Daily Inspection System)** is a comprehensive web-based application built to digitize, manage, and streamline the Daily Function Checkpoints and Technician Daily Checklists for Automated Optical Inspection (AOI) equipment. It replaces manual, paper-based processes with a secure, centralized system, empowering manufacturing engineers and technicians to effectively track the functionality and operational status of optical scanners and inspection tools across multiple production lines and shifts.

## Key Features & Modules
- **Digital Checklists & Checkpoints**: Digitized forms for both "Daily Function Checks" (40+ verification points including Laser Barcode, SPI, and Pre/Post-AOI detections) and "Technician Checklists".
- **Real-Time Dashboards & Reporting**: 
  - Centralized dashboard displaying today's submission metrics (Checklists, Checksheets, Active Groups) with shift breakdowns.
  - Advanced reporting engine with capabilities to filter by date, line, shift, and status, and export reports to CSV or PDF.
- **Robust Role-Based Access Control (RBAC)**: Secure multi-tier access system featuring Super Admin, Admin, Inspector, and Technician roles. Restricts critical actions like user management and report deletion to authorized personnel only.
- **System Activity & Audit Logging**: Comprehensive audit trail tracking user logins, logouts, checklist submissions, and administrative actions, promoting full traceability and compliance.

## Deep Dive: Line Management & Status Controls
A major component of the system is its intelligent handling of factory floor realities, specifically regarding the active status of production lines:
- **Line Enable/Disable (Line Management Module)**: 
  - A dedicated administrative panel allows Super Admins and Admins to toggle the installation status of all 25 physical production lines (e.g., marking lines as "Installed" or "Not Installed").
  - **Dynamic Form Integration**: When a line is disabled (Not Installed), it is automatically removed from the dropdown selections in the daily checklist forms, preventing technicians from submitting data for inactive equipment.
  - **Intelligent Reporting**: The reporting engine recognizes disabled lines and injects logical "dummy rows" into reports, ensuring that disabled lines are clearly marked as "Line Not Installed" rather than showing up as falsely "Pending" or "Not Filled."
- **Production vs. Line Stop States**:
  - For active (installed) lines, technicians can declare the operational status of the line as either "Production" or "Line Stop".
  - If a line is marked as "Line Stop" (e.g., due to maintenance or lack of work orders), the system intelligently bypasses the exhaustive 40+ point questionnaire, allowing an expedited submission that simply logs the line's halted status for that shift.
  - The reporting dashboard visually distinguishes these states using color-coded metrics (Green for Production, Amber for Line Stop, and Red for Not Filled).

## Data Integrity & Validation Safeguards
- **Duplicate Submission Enforcement**: The system operates on a strict one-submission-per-shift policy. It actively blocks users from submitting multiple checklists for the same line and shift on the same day, preventing data duplication.
- **Submission Locks**: Once a checksheet is submitted, it is cryptographically locked and stamped with the exact system date/time and the user's details (`Submitted By`). It cannot be edited, ensuring tamper-proof records.
- **Validation Rules**: Form submission is disabled if required fields are missing, and "Line Stop" or confirmation checkpoints must be explicitly acknowledged before data can be saved.

## Technical Architecture & Stack
The platform is built on a modern, robust, and scalable technology stack:
- **Frontend (Client)**: React 18, React Router DOM (v6), and Axios. Features a highly responsive, custom-styled interface (Vanilla CSS3 with Grid/Flexbox) without relying on bulky CSS frameworks, ensuring a lightweight and performant user experience.
- **Backend (Server)**: Node.js with Express.js, providing a fast and efficient RESTful API.
- **Database**: PostgreSQL, managed via Prisma ORM for type-safe database queries, schema management, and automated migrations.
- **Security & Authentication**: JWT-based session management, bcrypt password hashing, and express-rate-limit brute-force protection.
- **Deployment**: Configured for robust enterprise deployment on Windows IIS with automated startup task services.

## Conclusion
The **AOI CheckPoint** system stands as a modernized, secure, and highly functional asset for the manufacturing floor. By enforcing data integrity, elegantly handling line lifecycle states (enabled/disabled and production/stopped), and maintaining a strict audit trail, it significantly improves operational efficiency and quality assurance compliance.

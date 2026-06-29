# Workspace Rules: AOI Daily Inspection System (AOi_check_sheet)

This rule file provides critical project context, architectural details, and guidelines for AI coding assistants working in this workspace.

---

## 📌 Workspace Context

This repository contains the **AOI CheckPoint (Daily Inspection System)** web application, which digitizes checklists and daily checks for Automated Optical Inspection (AOI) machines.

### Tech Stack
- **Frontend**: React 18 (Create React App), Vanilla CSS3, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL (pg client pool).
- **Authentication**: JWT-based security with middleware on the backend.

### Project Architecture & Key Files
- **Backend Entrypoint**: [server.js](file:///Users/abhinandan/Documents/AOi_check_sheet/server/server.js)
- **Database Schema**: [schema.js](file:///Users/abhinandan/Documents/AOi_check_sheet/server/config/schema.js)
- **API Services**: [api.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/services/api.js)
- **Main React Layout**: [App.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/App.js)
- **Comprehensive Docs**: Refer to [MEMORY.md](file:///Users/abhinandan/Documents/AOi_check_sheet/MEMORY.md) in the workspace root.

---

## ⚠️ Important Rules & Guidelines

1. **Prisma ORM Schema & Migrations**: Do not write raw migration scripts or modify DB tables directly. Any database schema updates must be made in [schema.prisma](file:///Users/abhinandan/Documents/AOi_check_sheet/server/prisma/schema.prisma) and applied by running `npx prisma migrate dev --name <migration_name>` in the `server` directory. This creates migration files and generates/updates the client. The application is configured to run `npx prisma migrate deploy` automatically when the server starts.
2. **Authentication Interceptors**: All API endpoints except `/api/auth/login` require JWT authentication. Ensure all API requests go through the configured Axios client in [api.js](file:///Users/abhinandan/Documents/AOi_check_sheet/client/src/services/api.js) which automatically injects the `Bearer <token>` header.
3. **Role-Based Access Control (RBAC)**: Maintain the role checks for user routes and screen components. Only `super_admin` and `admin` have access to the User Management page.
4. **No TailwindCSS**: Avoid using TailwindCSS in this workspace unless explicitly requested by the USER. Style layouts using custom selectors in component-specific `.css` files.

# AOI CheckPoint — Implementation Plan for AI Agent
**Source:** Full QA session, 30 June 2026  
**Tested roles:** Super Admin (abhinandan), Inspector (john_doe), Technician (sarah_j)  
**Stack observed:** React SPA (CRA), Inter font, JWT in localStorage, Express-style REST API at `/api/*`

---

## Prerequisites the agent must establish first

1. Read and understand the project structure before touching anything.
2. Locate the auth token key name: `aoi_auth_token` in `localStorage`.
3. Locate the footer component — it contains a hardcoded credential that must be removed immediately.
4. Identify the i18n library in use (likely `react-i18next` or a custom context) — needed for all translation fixes.
5. The backend has at least two separate service groups:
   - Auth + Sessions + Checklist → working
   - User Management create/edit → currently returning network errors (may need backend fix too)

---

## CRITICAL — Fix immediately (before any other work)

### FIX-1: Remove password from footer
**File:** Find the footer component (likely `src/components/Footer.jsx` or `src/components/Layout.jsx`)  
**Change:** Replace the hardcoded string `"Designed & Maintained by Abhinandan Kumar (95003989)"` with a safe alternative, e.g. `"AOI CheckPoint © 2026 Vivo"` or pull name from an env variable — never from a user credential.  
**Why:** The string `95003989` is the super admin's live password, visible to every authenticated user.

### FIX-2: Logout must clear localStorage JWT
**File:** Wherever the Logout action is dispatched (profile modal, auth context/store)  
**Change:** After the logout API call (or on click if the API is unavailable), always run:
```js
localStorage.removeItem('aoi_auth_token');
```
Then `window.location.href = '/login'` (hard redirect, not `navigate()`) to guarantee the React state is fully reset.  
**Why:** The current logout leaves `aoi_auth_token` in localStorage. A subsequent user on the same browser gets a stale JWT that causes the frontend to show "Invalid username or password" even when the backend creates a valid session — confirmed by session logs showing a 6-second session at 127.0.0.1.

---

## HIGH PRIORITY fixes

### FIX-3: Add submission success/failure toast on both form pages
**Files:**
- `src/pages/ChecklistPage.jsx` (or similar) — Technician Checklist
- `src/pages/CheckpointPage.jsx` (or similar) — Daily Function Check

**Change:** After `await submitChecklist(data)` (or equivalent API call):
- On success (2xx): show a green success toast/banner — e.g. "Checklist submitted successfully" — and optionally redirect to `/reports`.
- On error (non-2xx / network fail): show a red error message and **do not reset the form** so the user's data is preserved.

Currently the form resets on both success AND failure with zero feedback. Users have no way to confirm their work was saved.

### FIX-4: Translate error messages in i18n
**File:** The login page error message and any other hardcoded English strings inside JS logic (not JSX).  
**Change:** Wrap all error strings through the i18n translation function, e.g.:
```js
// Before
setError('Invalid username or password');
// After
setError(t('error.invalidCredentials'));
```
Add corresponding keys to the Chinese translation file:
```json
"error": {
  "invalidCredentials": "用户名或密码无效",
  "serverUnreachable": "无法连接服务器，请检查后端是否运行"
}
```

### FIX-5: Disable Submit button on Daily Function Check when required fields are empty
**File:** `src/pages/CheckpointPage.jsx`  
**Change:** Mirror the Technician Checklist's pattern — compute a `isFormValid` boolean from Line, Group, Shift, Date:
```jsx
const isFormValid = line && group && shift && date;
<button disabled={!isFormValid}>Submit Checkpoint</button>
```
The Technician Checklist already does this correctly. Daily Function Check currently keeps the button enabled and relies on browser native validation, which fires off-screen.

### FIX-6: Add asterisk to Full Name in User Management create form
**File:** User Management page/component  
**Change:** The `Full Name` label is missing the `*` marker but the field has `required` in the DOM. Either:
- Add the asterisk: `Full Name *`
- Or remove `required` from the input if it truly is optional and remove the asterisk.
Pick one and be consistent.

---

## MEDIUM PRIORITY — UX improvements

### UX-1: Add password show/hide toggle on login form
**File:** Login page component  
**Change:** Add an eye icon button inside the password field that toggles `type="password"` ↔ `type="text"`.

### UX-2: Add "show password" toggle on User Management create and Profile change-password forms
Same pattern as UX-1.

### UX-3: Fix session status text format
**File:** Home dashboard session table (both Technician and Inspector views)  
**Change:** Replace `Logged_out` → `Logged Out` (the status string uses an underscore inconsistently with "Active (Current)").  
Look for where session status values are mapped to display strings and normalise them.

### UX-4: Inspector role must have distinct capabilities from Technician
**Current state:** Inspector and Technician have identical nav, identical pages, identical access. The Inspector role badge exists but provides zero additional functionality.  
**Proposed change (discuss with product before implementing):**
- Inspectors should be able to **view** Technician Checklist submissions but not submit new ones, OR
- Inspectors should see a dedicated "Review" page listing pending/submitted checklists with an Approve/Flag action.
At minimum, the nav should differ — Inspectors should not be able to submit Technician Checklists if their role is to verify the work.

### UX-5: Scope Reports by role
**File:** Reports page data-fetching logic  
**Change:**
- Technician: API should return only records where `submitted_by = current_user`, OR filter client-side.
- Inspector: can see all records for their assigned lines (if line assignment exists), or all records.
- Super Admin: sees everything (current behavior).
At minimum, add a "My Submissions" toggle filter on the Reports page.

### UX-6: Add success/loading state parity to User Management create
**Current state:** The Create User button shows "Saving…" during the request (good) but the backend is returning a network error. Once the backend is fixed, the UX flow should:
1. "Saving…" during request
2. On success: clear form + show green toast "User created successfully"
3. On error: preserve form + show red error message

### UX-7: Add "Forgot Password" placeholder
**File:** Login page  
**Change:** Add a "Forgot password? Contact your administrator." link or text below the Sign In button. Even if there's no self-service reset flow, the absence of any message leaves users confused.

### UX-8: Pre-populate Line/Group/Shift from user profile (future)
If the system can store a user's default Line, Group, and Shift (e.g. in their profile), pre-populate those fields on both form pages. This is a UX win for factory workers who fill the same values daily.

### UX-9: Replace raw UUIDs in session table with truncated display
**File:** Home dashboard session table  
**Change:** Show only the first 8 characters of the session ID + "…", with the full UUID available on hover via `title` attribute:
```jsx
<span title={session.id}>{session.id.slice(0, 8)}…</span>
```

### UX-10: Edit user — use a modal instead of in-place form replacement
**File:** User Management page  
**Change:** When "Edit" is clicked, open a modal dialog (or drawer) with the edit form instead of replacing the Create form in-place. The current behavior changes the form title from "Create New User" to "Edit User Account" without any visual transition, which is easy to miss.

### UX-11: Add password confirmation field to User Management create form
**File:** User Management create form  
**Change:** Add a "Confirm Password" field. The Profile modal already has this — apply the same pattern here.

### UX-12: Prevent deleting the last Super Admin
**File:** User Management delete action (frontend guard + backend validation)  
**Change:** Before sending DELETE, check if the target user is a Super Admin AND is the only Super Admin remaining. If so, show an error: "Cannot delete the only Super Admin account." Also add a backend guard on the DELETE endpoint.

### UX-13: Logout should redirect to login
**File:** Auth context / logout handler (separate from FIX-2 above)  
**Change:** After clearing localStorage and calling the logout API, force navigation to `/login`. Use `window.location.href = '/login'` not React Router's `navigate()` to ensure full React state teardown.

---

## ACCESSIBILITY fixes

### A11Y-1: Associate labels with form fields (18 violations)
**File:** Both form pages (Checklist and Checkpoint)  
**Change:** Every `<label>` must have a `htmlFor` that matches the input's `id`. Browser DevTools flagged 18 instances. Pattern:
```jsx
// Wrong
<label>LINE *</label>
<select>…</select>

// Correct
<label htmlFor="line-select">LINE *</label>
<select id="line-select">…</select>
```
Do this for all 18 flagged fields.

### A11Y-2: Label checkboxes in Daily Function Check
**File:** Daily Function Check form  
**Change:** Each checkbox needs an accessible label. Currently "Before · Bottom" etc. are column headers only — the individual checkboxes have no `aria-label`. Add:
```jsx
<input
  type="checkbox"
  aria-label={`${functionName} - Before Bottom`}
/>
```

---

## DATA INTEGRITY fixes (requires backend coordination)

### DATA-1: Standardise barcode field values
**Issue:** Older records store `"OK"` as the barcode check value; newer records store `"Yes"` / `"No"`.  
**Fix:**
- Backend migration: run a one-time UPDATE to normalise `"OK"` → `"Yes"` in existing records.
- Frontend: remove any code path that could write `"OK"` — the dropdowns already use Yes/No.

### DATA-2: Validate Line and Group values against allowed options
**Issue:** One record has `"Line 1"` and `"Group A"` — free-text values not matching current dropdowns.  
**Fix:**
- Backend: add enum validation on the checklist POST endpoint for `line` (must be 401–425) and `group` (must be A/B/C).
- Frontend: the dropdowns already restrict this, so the legacy data was entered before validation existed. No frontend change needed beyond what exists.

### DATA-3: RESPONSIBLE PERSON — link to user accounts
**Issue:** The Daily Function Check's "RESPONSIBLE PERSON" field is free text, leading to blank values in most reports.  
**Fix:** Replace the free-text input with a dropdown populated from the users API (filter to Inspector/Technician roles). Fall back to free text only if the users API is unavailable. On the backend, store the user ID rather than the name string.

---

## Backend fixes needed (flag to backend developer)

### BE-1: Fix User Management create/edit/delete endpoints
The `/api/users` POST endpoint returns a network error ("Cannot reach the server"). Verify:
- The route is registered correctly
- CORS or auth middleware is not blocking it
- The service/database connection for user creation is healthy

### BE-2: Fix logout endpoint (currently returns 401)
`POST /api/auth/logout` returns 401 instead of invalidating the session. The endpoint should:
1. Accept the Bearer token from the Authorization header
2. Invalidate the session in the database
3. Return 200

### BE-3: Reports initial load race condition
`GET /api/checklist` aborts on first navigation to `/reports` but succeeds on reload. Investigate whether a navigation event is cancelling the fetch before it completes — likely an `AbortController` tied to the page mount that fires too aggressively.

---

## Implementation order (recommended)

| Priority | Fix | Effort |
|----------|-----|--------|
| 1 | FIX-1: Remove password from footer | 5 min |
| 2 | FIX-2: Logout clears localStorage + redirects | 15 min |
| 3 | FIX-3: Success/error toast on form submit | 30 min |
| 4 | FIX-4: Translate error messages | 20 min |
| 5 | FIX-5: Disable submit button on Daily Function Check | 10 min |
| 6 | FIX-6: Full Name asterisk | 5 min |
| 7 | A11Y-1: Label all 18 form fields | 45 min |
| 8 | UX-3: Fix Logged_out → Logged Out | 5 min |
| 9 | UX-9: Truncate UUID in session table | 10 min |
| 10 | UX-1/UX-2: Show/hide password toggle | 20 min |
| 11 | UX-13: Logout redirect | 5 min (part of FIX-2) |
| 12 | UX-5: Scope Reports by role | 1–2 hrs |
| 13 | UX-4/DATA-3: Responsible Person dropdown | 2 hrs |
| 14 | UX-10: Edit user as modal | 1 hr |
| 15 | UX-12: Guard last Super Admin deletion | 30 min |
| 16 | DATA-1: Normalise barcode values (DB migration) | 1 hr |
| 17 | UX-4/Inspector role differentiation | Requires product decision |

---

## Testing checklist for the agent after changes

- [ ] Login with wrong credentials → error message appears in both EN and 中文
- [ ] Login with correct credentials → redirected to dashboard
- [ ] Click Logout → `aoi_auth_token` is gone from localStorage, page redirects to `/login`
- [ ] Login as different user on same browser after logout → succeeds without stale state
- [ ] Submit Technician Checklist with all fields → green success toast shown, form resets
- [ ] Submit Technician Checklist then navigate to Reports → submission appears
- [ ] Submit Daily Function Check with empty required fields → button is disabled (not clickable)
- [ ] Technician navigates to `/users` → redirected to home
- [ ] Inspector navigates to `/users` → redirected to home  
- [ ] Every form field responds to a screen reader label (check with axe DevTools)
- [ ] Footer contains no passwords or personal credentials
- [ ] User Management: attempt to delete only remaining Super Admin → error shown, not deleted

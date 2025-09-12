# Frontend (Vite + Tailwind) for your backend (User-only role)

## Setup
1. unzip/extract this folder
2. cd frontend_user_only
3. npm install
4. npm run dev

Frontend runs on http://localhost:5173 and expects backend at http://localhost:8081.

### Notes about routes (backend must match these):
- POST /register { username, email, password, role } -> returns 200 and user created
- POST /login { email, password } -> returns { message, token }
- GET /customerDetails -> returns array of customers
- POST /customerDetails { customerName, contactInfo, status } -> returns {message, newCustomer}
- PUT /customerDetails/:id -> returns {message, updatedCustomer}
- DELETE /customerDetails/:id
- GET /caseDetails -> returns array of cases
- POST /caseDetails { caseName, customerId, priority, status } -> returns {message, newCase}
- PUT /caseDetails/:id -> returns {message, updatedCase}
- DELETE /caseDetails/:id

### Authentication & role
- Token is stored in localStorage key `token` after login.
- The frontend decodes the token using `jwt-decode` and enforces role === 'user' for protected routes.
- Axios automatically attaches `Authorization: Bearer <token>` for all requests.

If you need changes (UI tweaks, modal edits, toasts, or different endpoints), tell me and I'll update the zip.

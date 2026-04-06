// Set required env vars for all unit tests
process.env.SESSION_SECRET = "test-secret-at-least-32-chars-long!!";
process.env.ADMIN_EMAILS = "admin@torvi.com";
process.env.ADMIN_PASSWORD = "test_admin_pass";
process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
// NODE_ENV is read-only in TypeScript strict mode; it's already set by the test runner

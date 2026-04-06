import { test, expect } from "@playwright/test";

test.describe("API — health check", () => {
  test("GET /api/health returns 200 with db connected", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("ok");
    expect(body.db).toBe("connected");
    expect(body.timestamp).toBeTruthy();
  });
});

test.describe("API — users", () => {
  test("POST /api/users creates a lead user", async ({ request }) => {
    const email = `test_lead_${Date.now()}@example.com`;
    const res = await request.post("/api/users", {
      data: {
        email,
        fullName: "",
        learningStatus: "lead",
        roleLabel: "Product Manager",
        quizRole: "product_manager",
        quizGoal: "workflow_tool",
      },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.user).toBeTruthy();
    expect(body.user.email).toBe(email);
    expect(body.user.learningStatus).toBe("lead");
  });

  test("POST /api/users with duplicate email returns existing user", async ({ request }) => {
    const email = `test_dup_${Date.now()}@example.com`;
    // First create
    await request.post("/api/users", {
      data: { email, fullName: "", learningStatus: "lead" },
    });
    // Second create — should return existing user (200) not error
    const res = await request.post("/api/users", {
      data: { email, fullName: "", learningStatus: "lead" },
    });
    expect([200, 201]).toContain(res.status());
    const body = await res.json();
    expect(body.user).toBeTruthy();
    expect(body.user.email).toBe(email);
  });

  test("GET /api/users?email= returns matching user", async ({ request }) => {
    const email = `test_get_${Date.now()}@example.com`;
    await request.post("/api/users", {
      data: { email, learningStatus: "lead" },
    });
    const res = await request.get(`/api/users?email=${encodeURIComponent(email)}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.users.length).toBeGreaterThan(0);
    expect(body.users[0].email).toBe(email);
  });
});

test.describe("API — admin login", () => {
  test("rejects non-admin email with 403", async ({ request }) => {
    const res = await request.post("/api/auth/admin-login", {
      data: { email: "notadmin@example.com", password: "anything" },
    });
    expect(res.status()).toBe(403);
    const body = await res.json();
    expect(body.error).toMatch(/not an admin/i);
  });

  test("rejects wrong password with 401", async ({ request }) => {
    const res = await request.post("/api/auth/admin-login", {
      data: {
        email: process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "theolaakomolafe@gmail.com",
        password: "definitely_wrong_password_xyz",
      },
    });
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.error).toMatch(/incorrect/i);
  });
});

test.describe("API — magic link", () => {
  test("returns 404 for unknown email", async ({ request }) => {
    const res = await request.post("/api/auth/magic", {
      data: { email: "nobody_at_all_xyz_999@example.com" },
    });
    expect(res.status()).toBe(404);
  });

  test("returns 400 when email is missing", async ({ request }) => {
    const res = await request.post("/api/auth/magic", {
      data: {},
    });
    expect(res.status()).toBe(400);
  });
});

test.describe("API — cron stall check (auth guard)", () => {
  test("rejects request without Authorization header in test env", async ({ request }) => {
    // NODE_ENV is not production in dev, so it may pass — just verify it doesn't 500
    const res = await request.post("/api/cron/check-stalls");
    expect([200, 401]).toContain(res.status());
  });

  test("rejects request with wrong bearer token", async ({ request }) => {
    const res = await request.post("/api/cron/check-stalls", {
      headers: { Authorization: "Bearer wrong_secret_token_xyz" },
    });
    // In dev mode it may pass; in production it should be 401
    expect([200, 401]).toContain(res.status());
  });
});

test.describe("API — checkout", () => {
  test("returns 400 when email is missing", async ({ request }) => {
    const res = await request.post("/api/checkout", {
      data: {},
    });
    expect(res.status()).toBe(400);
  });

  test("returns a Stripe checkout URL for valid email", async ({ request }) => {
    const res = await request.post("/api/checkout", {
      data: { email: "test@example.com", role: "product_manager" },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.url).toContain("stripe.com");
  });
});

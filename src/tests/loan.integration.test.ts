import request from "supertest";
import { sequelize } from "../models";
import User from "../models/user";
import LoanApplication from "../models/loanapplication";
import { createTestApp } from "./setup-test-env";

describe("Loan Application API", () => {
  let authToken: string;
  let customerId: string;

  const app = createTestApp();

  beforeAll(async () => {
    // await sequelize.sync({ force: true }); // Reset database before tests

    // ✅ Step 1: Create a Customer
    const customerRes = await request(app)
      .post("/v1/customers/signup") // Replace with actual customer registration endpoint
      .send({
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "password123",
      });


    expect(customerRes.status).toBe(200);
    customerId = customerRes.body.data.id; // Capture the customer ID

    // Step 2: Authenticate Customer
    const loginRes = await request(app)
      .post("/v1/auth/login") // Replace with actual login endpoint
      .send({
        email: "john.doe@example.com",
        password: "password123",
      });

    expect(loginRes.status).toBe(200);
    authToken = loginRes.body.data.token; // Capture the auth token
  });

  afterAll(async () => {
    await LoanApplication.destroy({ where: {} }); // Clean up test loans
    await User.destroy({ where: {} }); // Clean up test customers
    await sequelize.close(); // Close DB connection
  });

  afterEach(async () => {});

  describe("POST /loan/applications", () => {
    test("Should allow an authenticated customer to apply for a loan", async () => {
      const res = await request(app)
        .post("/v1/loan/applications")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          amount: 5000,
          term_months: 12,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("id");
    });
  });

  describe("GET /loan/applications/:id", () => {
    let loanId: string;

    beforeEach(async () => {
      // ✅ Step 3: Create a loan before each test
      const loan = await LoanApplication.create({
        customer_id: customerId,
        amount: 5000 * 100, // Assuming stored in pence
        term_months: 12,
        annual_interest_rate: 5.0,
        monthly_interest_rate: 0.42,
        monthly_repayment: 43000,
        monthly_interest: 2500,
      });

      loanId = loan.id;
    });

    test("Should return loan details", async () => {
      const res = await request(app)
        .get(`/v1/loan/applications/${loanId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("id", loanId);
    });
  });
});

import { calculateMonthlyRepayment, amountInPence } from "./../lib/loan";

describe("calculateMonthlyRepayment", () => {
  it("should calculate the correct monthly repayment", () => {
    const amount = amountInPence(1000); // Convert £1000 to pence
    const termMonths = 12; // 1 year

    const result = calculateMonthlyRepayment(amount, termMonths);

    expect(result).toHaveProperty("monthlyRepayment");
    expect(result).toHaveProperty("monthlyInterestRate");
    expect(result).toHaveProperty("monthlyInterest");

    // Validate expected output
    expect(result.monthlyRepayment).toBeGreaterThan(0);
    expect(result.monthlyInterestRate).toBeGreaterThan(0);
    expect(result.monthlyInterest).toBeGreaterThan(0);
  });

  it("should throw an error when term is 0", () => {
    const amount = amountInPence(1000);
    expect(() => calculateMonthlyRepayment(amount, 0)).toThrow("Loan term must be greater than zero.");
  });

  it("should throw an error when term is negative", () => {
    const amount = amountInPence(1000);
    expect(() => calculateMonthlyRepayment(amount, -6)).toThrow("Loan term must be greater than zero.");
  });

  it("should return correct values for a 36-month term", () => {
    const amount = amountInPence(5000); // Convert £2000 to pence
    const termMonths = 36; // 3 years

    const result = calculateMonthlyRepayment(amount, termMonths);

    expect(result.monthlyRepayment).toEqual(14985);
    expect(result.monthlyInterestRate).toEqual(0.4167);
    expect(result.monthlyInterest).toEqual(2083);
  });
});

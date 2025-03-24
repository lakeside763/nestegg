import BigNumber from "bignumber.js";

export const amountInPence = (amount: number) => {
  return Math.round(amount * 100); 
}

export const amountInPounds = (amount: number) => {
  return Number((amount / 100).toFixed(2));
}

export const ANNUAL_INTEREST_RATE = new BigNumber(5.0)

export const calculateMonthlyRepayment = (
  amount: number, // amount in pence 
  term_months: number 
) => {
  if (term_months <= 0) {
    throw new Error("Loan term must be greater than zero.");
  }

  const monthlyInterestRate = ANNUAL_INTEREST_RATE.div(100).div(12);
  const n = new BigNumber(term_months);
  const P = new BigNumber(amount);
  const r = monthlyInterestRate;

  // denominator = Math.pow(1 + r, n) - 1; Convert to BigNumber
  const denominator = r.plus(1).pow(n).minus(1);
  if (denominator.isZero()) {
    throw new Error("Invalid loan term calculation.");
  }

  // numerator = P * r * Math.pow(1 + r, n); Convert to BigNumber
  const numerator = P.times(r).times(r.plus(1).pow(n));

  const monthlyRepayment = numerator.div(denominator);
  const monthlyInterest = P.times(r);

  return {
    monthlyRepayment: Math.round(monthlyRepayment.toNumber()), // Monthly repayment in pence
    monthlyInterestRate: r.times(100).decimalPlaces(4).toNumber(), // Convert to percentage
    monthlyInterest: Math.round(monthlyInterest.toNumber()), // Monthly interest in pence
  };
};
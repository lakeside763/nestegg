import { amountInPence, amountInPounds, ANNUAL_INTEREST_RATE, calculateMonthlyRepayment } from "../../lib/loan";
import { ForbiddenException, NotFoundException } from "../../middlewares/error";
import LoanApplication, { ICreateLoanApplication, LoanApplicationStatus } from "../../models/loanapplication";

export default class LoanService {
  async createLoanApplication(applicationData: ICreateLoanApplication) {
    const { customer_id, term_months } = applicationData;

    const existingLoanApplication = await LoanApplication.findOne({ 
      where: { customer_id },
      order: [['created_at', 'DESC']]
    });

    if (existingLoanApplication && existingLoanApplication.status !== LoanApplicationStatus.PAID) {
      throw new ForbiddenException("Unpaid loan application exists.");
    }

    const amount = amountInPence(applicationData.amount);
    
    const { 
      monthlyRepayment, 
      monthlyInterestRate, 
      monthlyInterest 
    } = calculateMonthlyRepayment(amount, term_months);

    const loanApplication = await LoanApplication.create({
      customer_id,
      amount, // Save amount in pence
      term_months,
      annual_interest_rate: Number(ANNUAL_INTEREST_RATE.toFixed(2)),
      monthly_interest_rate: monthlyInterestRate,
      monthly_repayment: monthlyRepayment, // Save monthly repayment in pence
      monthly_interest: monthlyInterest, // Save monthly interest in pence
    });

    return {
      ...loanApplication.dataValues,
      amount: amountInPounds(amount),
      monthly_repayment: amountInPounds(monthlyRepayment),
      annual_interest_rate: Number(ANNUAL_INTEREST_RATE.toFixed(2)),
      monthly_interest_rate: monthlyInterestRate,
      monthly_interest: amountInPounds(monthlyInterest),
    };
  }

  async getLoanApplicaation(id: string, customer_id: string) {
    const loanApplication = await LoanApplication.findByPk(id);

    if (!loanApplication) {
      throw new NotFoundException("Load application record not found");
    }

    if (loanApplication.customer_id !== customer_id) {
      throw new ForbiddenException("Not allowed customer ID")
    }

    return {
      ...loanApplication.dataValues, 
      amount: amountInPounds(loanApplication.amount),
      monthly_repayment: amountInPounds(loanApplication.monthly_repayment),
      annual_interest_rate: Number(ANNUAL_INTEREST_RATE.toFixed(2)),
      monthly_interest_rate: Number(loanApplication.monthly_interest_rate),
      monthly_interest: amountInPounds(loanApplication.monthly_interest),
    };
  }
}
import { NextFunction, Request, Response } from "express";
import LoanService from "./loan.service";
import User from "../../models/user";
import { AuthenticatedRequest } from "../../middlewares/auth";

export default class LoanController {
  private readonly loanService: LoanService;

  constructor(loanService: LoanService) {
    this.loanService = loanService
  }

  createLoanApplication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { id: customer_id } = req.user as User;
      const { amount, term_months } = req.body;
      const application = await this.loanService.createLoanApplication({
        customer_id, 
        amount, 
        term_months
      });
      return res.status(200).json({
        success: true,
        message: "Loan application created successfully",
        data: application,
      })
    } catch (err) {
      return next(err);
    }
  }

  getLoanApplication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      // const { id: customer_id } = req.user as User;
      const { id } = req.params;
      const customer_id = "1111";
      const loanApplication = await this.loanService.getLoanApplicaation(id, customer_id);
      return res.status(200).json({
        success: true,
        message: "Loan application fetched successfully",
        data: loanApplication,
      })
    } catch (err) {
      return next(err);
    }
  }
}
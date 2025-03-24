import { Router } from "express";
import { getLoanApplicationValidation, loanApplicationValidation } from "./loan.validation";
import LoanService from "./loan.service";
import LoanController from "./loan.controller";

const router = Router();

const loanService = new LoanService();
const loanController = new LoanController(loanService);

router.route('/loan/applications')
  .post(loanApplicationValidation, loanController.createLoanApplication);

router.route('/loan/applications/:id')
  .get(getLoanApplicationValidation, loanController.getLoanApplication);

export default router;
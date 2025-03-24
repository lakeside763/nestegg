import { Router } from "express"; 
import authRoute from "./../modules/auth";
import customerRoute from "./../modules/customer";
import loanRoute from "./../modules/loan";

const router = Router();

router.use(authRoute);
router.use(customerRoute);
router.use(loanRoute);

export default router;
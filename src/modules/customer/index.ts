import { Router } from "express";
import { createCustomerValidation } from "./customer.validation";
import CustomerService from "./customer.service";
import CustomerController from "./customer.controller";

const router = Router();

const customerService = new CustomerService();
const customerController = new CustomerController(customerService);

router.route('/customers/signup')
  .post(createCustomerValidation, customerController.createCustomer)

export default router;
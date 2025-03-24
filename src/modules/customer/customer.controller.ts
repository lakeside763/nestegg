import { NextFunction, Request, Response } from "express";
import CustomerService from "./customer.service";

export default class CustomerController {
  private readonly customerService: CustomerService;

  constructor(customerService: CustomerService){
    this.customerService = customerService;
  }

  createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.customerService.createCustomer(req.body);
      return res.status(200).json({
        success: true,
        message: 'Customer account created successfully',
        data,
      })
    } catch (err) {
      return next(err);
    }
  }
}
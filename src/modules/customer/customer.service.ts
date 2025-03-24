import { BadRequestException } from "../../middlewares/error";
import User, { ICreateCustomer, RoleType } from "../../models/user";
import bcrypt from 'bcryptjs';

export default class CustomerService {
  async createCustomer(customerData: ICreateCustomer) {
    const { password, email, first_name, last_name } = customerData;

    const existingCustomer = await User.findOne({ where: { email } });
    if (existingCustomer) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = await User.create({
      first_name,
      last_name,
      email,
      role: RoleType.CUSTOMER,
      hashed_password: hashedPassword,
    });

    return {
      id: newCustomer.id,
      first_name: newCustomer.first_name,
      last_name: newCustomer.last_name,
      role: newCustomer.role,
      created_at: newCustomer.created_at,
    };
  }
}
import { generateToken } from "../../lib/auth";
import { BadRequestException, NotFoundException } from "../../middlewares/error";
import User from "../../models/user";
import bcrypt from "bcryptjs";

export default class AuthService {

  async login(email: string, password: string) {
    const user = await User.findOne({ 
      where: { email },
    });
    if (!user || !user.hashed_password) throw new NotFoundException("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
    if (!isPasswordValid) throw new BadRequestException("Invalid password")

    const payload = { id: user.id, role: user.role }
    const token = await generateToken(payload)

    return { 
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name, 
      },
      token 
    }
  }
}
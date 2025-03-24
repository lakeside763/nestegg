import jwt from 'jsonwebtoken';

export const generateToken = async (payload: Record<string, unknown>): Promise<string> => {
  const SECRET_KEY = process.env.JWT_SECRET!;
  const TOKEN_EXPIRY = Number(process.env.TOKEN_EXPIRY!);
  return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
};

export const verifyToken = async (token: string): Promise<Record<string, unknown>> => {
  const SECRET_KEY = process.env.JWT_SECRET!;
  return jwt.verify(token, SECRET_KEY) as Record<string, unknown>;
};
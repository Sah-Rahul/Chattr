import bcrypt from "bcrypt";

export const hashPassword = async (
  value: string,
  saltRounds: number = 10
): Promise<string> => {
  return bcrypt.hash(value, saltRounds);
};

export const comparePassword = async (
  value: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(value, hashedPassword);
};

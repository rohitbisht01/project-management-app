import bcrypt from "bcrypt";

export const compareValue = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const hashValue = async (value: string, saltRounds: number = 10) => {
  return await bcrypt.hash(value, saltRounds);
};

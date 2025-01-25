import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { BadRequestException } from "../utils/appError";

export const registerUserService = async (body: {
  email: string;
  password: string;
  name: string;
}) => {
  const { email, password, name } = body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);
    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    const user = new UserModel({
      email,
      password,
      name,
    });
    await user.save();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};

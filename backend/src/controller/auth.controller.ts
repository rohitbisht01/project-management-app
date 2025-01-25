import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { registerSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { registerUserService } from "../services/auth.service";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({ ...req.body });

    await registerUserService(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfully",
    });
  }
);

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const logoutUserController = asyncHandler(
  async (req: Request, res: Response) => {}
);

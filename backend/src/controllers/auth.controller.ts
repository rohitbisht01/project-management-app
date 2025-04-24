import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { registerSchema } from "../validation/auth.validation";
import { registerUserService } from "../services/auth.service";
import { HTTPSTATUS } from "../config/http.config";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({
      ...req.body,
    });

    await registerUserService(body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfuly",
    });
  }
);

export const logoutController = asyncHandler(
  async (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
          error: "Failed to log out",
        });
      }
    });

    req.session = null;
    return res.status(HTTPSTATUS.OK).json({
      message: "Logged out successfully",
    });
  }
);

export const googleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {}
);

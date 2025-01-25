import dotenv from "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import passport from "passport";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { BadRequestException } from "./utils/appError";
import { ErrorCodeEnum } from "./enums/error-code.enum";
import { HTTPSTATUS } from "./config/http.config";

import authRoutes from "./routers/auth.route";

const BASE_PATH = config.BASE_PATH;

const app = express();

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);
// app.use(passport.initialize());
// app.use(passport.session());

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException(
      "This is a bad request",
      ErrorCodeEnum.AUTH_INVALID_TOKEN
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Welcome",
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
  await connectDatabase();
});

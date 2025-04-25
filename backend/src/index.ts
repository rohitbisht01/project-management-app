import express from "express";
import { config } from "./config/app.config";
import session from "cookie-session";
import passport from "passport";
import cors from "cors";
import connectDatabase from "./config/database.config";
import authRoutes from "./routes/auth.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

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
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
// app.use(`${BASE_PATH}/user`);
// app.use(`${BASE_PATH}/workspace`);
// app.use(`${BASE_PATH}/member`);
// app.use(`${BASE_PATH}/project`);
// app.use(`${BASE_PATH}/task`);

app.listen(config.PORT, async () => {
  console.log(`server running on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});

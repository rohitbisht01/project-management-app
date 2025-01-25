import { Router } from "express";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../controller/auth.controller";
const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

export default router;

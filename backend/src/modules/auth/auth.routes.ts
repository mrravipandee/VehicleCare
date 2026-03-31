import { Router } from "express";

import { register, sendOtp, verifyOtp } from "./auth.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { getMe } from "./me.controller";

const authRouter = Router();

// Public routes
authRouter.post("/register", register);
authRouter.post("/login/send-otp", sendOtp);
authRouter.post("/login/verify-otp", verifyOtp);

// Protected routes
authRouter.get("/me", authenticate, getMe);

export default authRouter;
import { Router } from "express";
import { uploadDocument } from "../controllers/upload.controller";
import { authenticate } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";

const router = Router();

router.post(
    "/", 
    authenticate, 
    upload.single("file"), 
    uploadDocument);

export default router;
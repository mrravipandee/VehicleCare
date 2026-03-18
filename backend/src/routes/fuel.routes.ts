import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createFuelLog, getFuelLogs } from "../controllers/fuel.controller";

const router = Router();


router.post("/", authenticate, createFuelLog);
router.get("/:vehicleId", authenticate, getFuelLogs);

export default router;

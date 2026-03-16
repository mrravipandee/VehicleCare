import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
    createVehicle,
    getVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle
} from "../controllers/vehicle.controller";

const router = Router();

router.post("/", authenticate, createVehicle);
router.get("/", authenticate, getVehicles);
router.get("/:id", authenticate, getVehicle);
router.put("/:id", authenticate, updateVehicle);
router.delete("/:id", authenticate, deleteVehicle);

export default router;
import { Router } from "express";
import {
    createServiceRecord,
    getServiceRecords,
    updateServiceRecord,
    deleteServiceRecord
} from "../controllers/service.controller";

// Import authentication middleware to protect service record routes
// give me token and role to access the service record routes
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Service record routes for a specific vehicle
router.post("/", authenticate, createServiceRecord); 
router.get("/:vehicle_id", authenticate, getServiceRecords);
router.put("/:id", authenticate, updateServiceRecord);
router.delete("/:id", authenticate, deleteServiceRecord);

export default router;
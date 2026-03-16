import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

const getUserId = (req: AuthRequest) => req.user?.id;
const getVehicleId = (req: AuthRequest) =>
    Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

export const createVehicle = async (req: AuthRequest, res: Response) => {
    try {
        const userId = getUserId(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { brand, model, vehicle_number, fuel_type, current_km } = req.body;

        const vehicle = await prisma.vehicle.create({
            data: {
                brand,
                model,
                vehicle_number,
                fuel_type,
                current_km,
                user_id: userId
            },
        });

        res.json({ message: "Vehicle created successfully", data: vehicle });
    } catch (error) {
        res.status(500).json({ message: "Error creating vehicle", error });

    }
};

export const getVehicles = async (req: AuthRequest, res: Response) => {
    try {
        const userId = getUserId(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const vehicles = await prisma.vehicle.findMany({
            where: { user_id: userId },
        });
        res.json({ data: vehicles });
    } catch (error) {
        res.status(500).json({ message: "Error fetching vehicles", error });
    }

};

export const getVehicle = async (req: AuthRequest, res: Response) => {
    try {
        const vehicleId = getVehicleId(req);
        if (!vehicleId) {
            return res.status(400).json({ message: "Vehicle id is required" });
        }

        const vehicle = await prisma.vehicle.findFirst({
            where: { id: vehicleId },
        });

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.json({ data: vehicle });
    } catch (error) {
        res.status(500).json({ message: "Error fetching vehicle", error });
    }
}

export const updateVehicle = async (req: AuthRequest, res: Response) => {
    try {
        const vehicleId = getVehicleId(req);
        if (!vehicleId) {
            return res.status(400).json({ message: "Vehicle id is required" });
        }

        const { brand, model, vehicle_number, fule_type, current_km } = req.body;

        const vehicle = await prisma.vehicle.update({
            where: { id: vehicleId },
            data: {
                brand,
                model,
                vehicle_number,
                fuel_type: fule_type,
                current_km
            },
        });

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.json({ message: "Vehicle updated successfully", data: vehicle });
    } catch (error) {
        res.status(500).json({ message: "Error updating vehicle", error });
    }
}

export const deleteVehicle = async (req: AuthRequest, res: Response) => {
    try {
        const vehicleId = getVehicleId(req);
        if (!vehicleId) {
            return res.status(400).json({ message: "Vehicle id is required" });
        }

        const vehicle = await prisma.vehicle.delete({
            where: { id: vehicleId },
        });

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting vehicle", error });
    }
}
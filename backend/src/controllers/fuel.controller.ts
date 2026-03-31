import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createFuelLog = async (req: AuthRequest, res: Response) => {
    try {
        const {
            vehicle_id,
            fuel_amount,
            fuel_cost,
            km_reading,
            fuel_date
        } = req.body;

        const vehile = await prisma.vehicle.findFirst({
            where: {
                id: vehicle_id,
                user_id: Array.isArray(req.user) ? req.user[0].id : req.user?.id
            },
        });

        if (!vehile) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        const fuelLog = await prisma.fuelLog.create({
            data: {
                vehicle_id,
                fuel_amount,
                fuel_cost,
                km_reading,
                fuel_date: new Date(fuel_date)
            },
        });

        res.status(201).json(fuelLog);

    } catch (error) {
        res.status(500).json({ message: "Error creating fuel log", error });
    }
};

export const getFuelLogs = async (req: AuthRequest, res: Response) => {
    try {
        const rawVehicleId = req.params.vehicleId;
        const vehicleId = Array.isArray(rawVehicleId) ? rawVehicleId[0] : rawVehicleId;

        const logs = await prisma.fuelLog.findMany({
            where: { vehicle_id: vehicleId },
            orderBy: { fuel_date: "asc" },
        });

        // Calculate mileage data
        let mileageData: any[] = [];

        for (let i = 1; i < logs.length; i++) {
            const prev = logs[i - 1];
            const curr = logs[i];

            const distance = curr.km_reading - prev.km_reading;
            const mileage = distance / Number(curr.fuel_amount);

            mileageData.push({
                date: curr.fuel_date,
                mileage: mileage.toFixed(2),
            });
        }

        res.json({
            logs,
            mileage: mileageData,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching fuel logs", error });
    }
};


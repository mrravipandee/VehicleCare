import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createServiceRecord = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const {
            vehicle_id,
            service_type,
            garage_name,
            cost,
            service_date,
            next_service_km,
            service_km,
            notes,
        } = req.body;

        const service = await prisma.serviceRecord.create({
            data: {
                vehicle_id,
                service_type,
                garage_name,
                cost,
                service_date: new Date(service_date),
                next_service_km,
                service_km,
                notes,
            },
        });

        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: "Error creating service record", error });
    }
};

export const getServiceRecords = async (
    req: AuthRequest,
    res: Response
) => {

    try {
        const {
            vehicle_id,
        } = req.params;

        const services = await prisma.serviceRecord.findMany({
            where: { vehicle_id: Array.isArray(vehicle_id) ? vehicle_id[0] : vehicle_id },
            orderBy: { service_date: "desc" },
        });

        res.json(services);
    } catch (error) {
        res.status(500).json({ message: "Error fetching service records", error });
    }
};

export const updateServiceRecord = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { id } = req.params;

        const update = await prisma.serviceRecord.update({
            where: { id: Array.isArray(id) ? id[0] : id },
            data: req.body,
        });

        res.json(update);
    } catch (error) {
        res.status(500).json({ message: "Error updating service record", error });
    }
};

export const deleteServiceRecord = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { id } = req.params;

        await prisma.serviceRecord.delete({
            where: { id: Array.isArray(id) ? id[0] : id },
        });

        res.json({ message: "Service record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting service record", error });
    }
};
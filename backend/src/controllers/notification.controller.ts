import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getNotifications = async (req: AuthRequest, res: Response) => {
    try {
        const notfications = await prisma.notification.findMany({
            where: { user_id: req.user?.id },
            orderBy: { created_at: "desc" },
        });
        res.json(notfications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Server error" });
    }
};
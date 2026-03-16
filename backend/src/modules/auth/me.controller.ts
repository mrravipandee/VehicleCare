import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { prisma } from "../../config/prisma";

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
        role: true,
        created_at: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

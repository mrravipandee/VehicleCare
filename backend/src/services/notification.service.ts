import { prisma } from "../config/prisma";

export const createNotification = async (
  user_id: string,
  title: string,
  message: string,
  type: "SERVICE_REMINDER" | "ALERT"
) => {
  return prisma.notification.create({
    data: {
      user_id,
      title,
      message,
      type,
    },
  });
};
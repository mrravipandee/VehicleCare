import { prisma } from "../config/prisma";
import { createNotification } from "./notification.service";

export const checkServiceReminders = async () => {
  const vehicles = await prisma.vehicle.findMany({
    include: {
      service_records: true,
      user: true,
    },
  });

  for (const vehicle of vehicles) {
    const lastService = vehicle.service_records.sort(
      (a, b) => new Date(b.service_date).getTime() - new Date(a.service_date).getTime()
    )[0];

    if (!lastService || !lastService.next_service_km) continue;

    if (vehicle.current_km >= lastService.next_service_km) {
      await createNotification(
        vehicle.user_id,
        "Service Due 🚗",
        `Your ${vehicle.brand} ${vehicle.model} needs servicing`,
        "SERVICE_REMINDER"
      );
    }
  }
};
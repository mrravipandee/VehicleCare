import cron from "node-cron";
import { checkServiceReminders } from "../services/reminder.service";

export const startReminderJob = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("Running reminder check...");
    await checkServiceReminders();
  });
};
import "dotenv/config";
import express from "express";
import cors from "cors";

import authRouter from "./modules/auth/auth.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import serviceRoutes from "./routes/service.routes";
import fuelRoutes from "./routes/fuel.routes";
import uploadRoutes from "./routes/upload.routes";
import invoiceRoutes from "./routes/invoice.routes";
import { startReminderJob } from "./jobs/reminder.job";
import notificationRoutes from "./routes/notification.routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes
startReminderJob(); // Start the reminder job when the server starts
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/auth", authRouter);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/fuel", fuelRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Vehicle Care API running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
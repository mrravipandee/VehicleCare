import "dotenv/config";
import express from "express";
import cors from "cors";

import authRouter from "./modules/auth/auth.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import serviceRoutes from "./routes/service.routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/services", serviceRoutes);

app.get("/", (req, res) => {
  res.send("Vehicle Care API running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
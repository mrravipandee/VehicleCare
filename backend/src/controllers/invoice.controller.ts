import { Response } from "express";
import PDFDocument from "pdfkit";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const generateInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const { serviceId } = req.params as { serviceId: string };

    // 🔒 Get service with vehicle
    const service = await prisma.serviceRecord.findUnique({
      where: { id: serviceId },
      include: {
        vehicle: true,
      },
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // 🔒 Ownership check
    if (service.vehicle.user_id !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // 📄 Create PDF
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${serviceId}.pdf`
    );

    doc.pipe(res);

    // 🧾 Invoice Content
    doc.fontSize(20).text("MotoTrack Invoice", { align: "center" });

    doc.moveDown();

    doc.fontSize(12).text(`Invoice ID: ${serviceId}`);
    doc.text(`Date: ${new Date(service.service_date).toDateString()}`);

    doc.moveDown();

    doc.text(`Vehicle: ${service.vehicle.brand} ${service.vehicle.model}`);
    doc.text(`Number: ${service.vehicle.vehicle_number}`);

    doc.moveDown();

    doc.text(`Service Type: ${service.service_type}`);
    doc.text(`Garage: ${service.garage_name}`);
    doc.text(`Cost: ₹${service.cost}`);

    doc.moveDown();

    doc.text("Thank you for using MotoTrack!", {
      align: "center",
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: "Failed to generate invoice" });
  }
};
import { Response } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { s3 } from "../config/s3";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

const getUserId = (req: AuthRequest) => req.user?.id;

export const uploadDocument = async (req: AuthRequest, res: Response) => {

    try {
        const userId = getUserId(req);

        const file = req.file;
        const { vehicleId, documentType } = req.body;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // ownership check
        const vehicle = await prisma.vehicle.findFirst({
            where: {
                id: vehicleId,
                user_id: userId,
            },
        });

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found or unauthorized" });
        }

        const fileKey = `documents/${uuidv4()}-${file.originalname}`;

        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
        );

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

        const document = await prisma.document.create({
            data: {
                vehicle_id: vehicleId,
                file_url: fileUrl,
                document_type: documentType,
            },
        });

        res.json({ message: "Document uploaded successfully", data: document });
    } catch (error) {
        res.status(500).json({ message: "Error uploading document", error });
    }
};


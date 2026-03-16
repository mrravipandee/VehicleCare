import { Request, Response } from "express";
import { UserRole } from "@prisma/client";

import { registerUser, sendLoginOtp, verifyLoginOtp } from "./auth.service";

const parseRole = (value: unknown): UserRole | undefined => {
  if (!value || typeof value !== "string") {
    return undefined;
  }

  if (value in UserRole) {
    return value as UserRole;
  }

  throw new Error("Invalid role value");
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error";
};

export const register = async (req: Request, res: Response) => {
  try {
    const { phone_number, name, email, role } = req.body as {
      phone_number?: string;
      name?: string;
      email?: string;
      role?: string;
    };

    if (!phone_number) {
      return res.status(400).json({
        message: "phone_number is required",
      });
    }

    const user = await registerUser({
      phoneNumber: phone_number,
      name,
      email,
      role: parseRole(role),
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: getErrorMessage(error),
    });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { phone_number } = req.body as { phone_number?: string };

    if (!phone_number) {
      return res.status(400).json({
        message: "phone_number is required",
      });
    }

    const result = await sendLoginOtp(phone_number);

    return res.status(200).json({
      message: "OTP sent successfully",
      data: {
        phone_number: result.user.phone_number,
        status: result.status,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: getErrorMessage(error),
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { phone_number, code } = req.body as {
      phone_number?: string;
      code?: string;
    };

    if (!phone_number || !code) {
      return res.status(400).json({
        message: "phone_number and code are required",
      });
    }

    const result = await verifyLoginOtp({
      phoneNumber: phone_number,
      code,
    });

    return res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: getErrorMessage(error),
    });
  }
};
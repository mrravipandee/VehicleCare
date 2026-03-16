import { User, UserRole } from "@prisma/client";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import twilio from "twilio";

import { prisma } from "../../config/prisma";

type RegisterInput = {
  phoneNumber: string;
  name?: string;
  email?: string;
  role?: UserRole;
};

type VerifyOtpInput = {
  phoneNumber: string;
  code: string;
};

const normalizePhoneNumber = (value: string) => value.trim();

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is not configured`);
  }

  return value;
};

const getTwilioVerifyClient = () => {
  const accountSid = getRequiredEnv("TWILIO_ACCOUNT_SID");
  const authToken = getRequiredEnv("TWILIO_AUTH_TOKEN");
  const verifyServiceSid = getRequiredEnv("TWILIO_VERIFY_SERVICE_SID");

  return {
    verifyServiceSid,
    client: twilio(accountSid, authToken),
  };
};

const signAuthToken = (user: User) => {
  const jwtSecret: Secret = getRequiredEnv("JWT_SECRET");
  const signOptions: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"],
  };

  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
      phone_number: user.phone_number,
    },
    jwtSecret,
    signOptions,
  );
};

export const registerUser = async ({ phoneNumber, name, email, role }: RegisterInput) => {
  const normalizedPhone = normalizePhoneNumber(phoneNumber);

  const existingUser = await prisma.user.findUnique({
    where: {
      phone_number: normalizedPhone,
    },
  });

  if (existingUser) {
    throw new Error("User already exists with this phone number");
  }

  const user = await prisma.user.create({
    data: {
      phone_number: normalizedPhone,
      name,
      email,
      role: role ?? UserRole.USER,
    },
  });

  return user;
};

export const sendLoginOtp = async (phoneNumber: string) => {
  const normalizedPhone = normalizePhoneNumber(phoneNumber);

  const user = await prisma.user.findUnique({
    where: {
      phone_number: normalizedPhone,
    },
  });

  if (!user) {
    throw new Error("User not found. Please register first");
  }

  const { client, verifyServiceSid } = getTwilioVerifyClient();

  const verification = await client.verify.v2
    .services(verifyServiceSid)
    .verifications.create({
      to: normalizedPhone,
      channel: "sms",
    });

  return {
    user,
    status: verification.status,
  };
};

export const verifyLoginOtp = async ({ phoneNumber, code }: VerifyOtpInput) => {
  const normalizedPhone = normalizePhoneNumber(phoneNumber);

  const user = await prisma.user.findUnique({
    where: {
      phone_number: normalizedPhone,
    },
  });

  if (!user) {
    throw new Error("User not found. Please register first");
  }

  const { client, verifyServiceSid } = getTwilioVerifyClient();

  const verificationCheck = await client.verify.v2
    .services(verifyServiceSid)
    .verificationChecks.create({
      to: normalizedPhone,
      code,
    });

  if (verificationCheck.status !== "approved") {
    throw new Error("Invalid or expired OTP");
  }

  const token = signAuthToken(user);

  return {
    token,
    user,
  };
};
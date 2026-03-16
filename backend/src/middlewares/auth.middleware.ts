import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@prisma/client";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
    phone_number: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid Authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: "JWT secret not configured" });
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;

    req.user = {
      id: payload.sub as string,
      role: payload.role as UserRole,
      phone_number: payload.phone_number as string,
    };

    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden: insufficient permissions" });
      return;
    }
    next();
  };
};

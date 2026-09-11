import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { createError, errorResponse } from "../utils/errorHandler";
// Middleware to verify JWT token
declare module "next" {
  export interface NextApiRequest {
    user?: {
      _id: number;
      role: string;
      // Add any other user-related properties here
    };
  }
}
export interface Token {
  _id: string;
  role: string;
  craftsman: string;
}

export function verifyToken(req: any) {
  try {
    const authHeader = req.headers?.authorization || (req.headers && typeof req.headers.get === 'function' ? req.headers.get("authorization") : null);
    const token = authHeader?.split(" ")[1];
    if (!token) {
      createError("Token nicht gefunden", 404);
      return null;
    }
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as Token;

    if (decoded && decoded._id) {
      return decoded;
    } else return null;
  } catch (error: any) {
    // errorResponse(res, error);
    throw new Error("Ungültiges Token");
  }
}

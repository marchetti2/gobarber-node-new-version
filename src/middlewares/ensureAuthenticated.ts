import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "../config/auth";

interface tokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAutheticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as tokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new Error("Invalid Token");
  }
}

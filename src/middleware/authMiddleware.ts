import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { UserRole } from "../constants/enums";

const authMiddleware = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image as string,
      emailVerified: session.user.emailVerified,
      role: session.user.role as UserRole,
    };

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };
};

export default authMiddleware;

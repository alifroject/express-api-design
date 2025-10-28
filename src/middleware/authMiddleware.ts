import { error } from "console";
import { Request, Response, NextFunction } from "express";

import Jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "secret";

interface JwtPayload {
    userId: number;
    iat: number;
    exp: number;
}

export const auuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const payload = Jwt.verify(token, JWT_SECRET) as {id: number};
        (req as any).user = { id: payload.id } as any;
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}
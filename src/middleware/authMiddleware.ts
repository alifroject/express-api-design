import { error } from "console";
import { Request, Response, NextFunction } from "express";

import Jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "secret";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {


    let token = req.headers.authorization;

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1]; // remove Bearer prefix
    }
    try {
        const payload = Jwt.verify(token, JWT_SECRET) as { id: number; email: string };
        (req as any).user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}


export const adminOnly = (req: Request, res: Response) => {
    const user = (req as any).user;
    if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" })
    }
}

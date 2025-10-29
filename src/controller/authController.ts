import { Request, Response } from "express";
import * as authService from "../service/authService";

export const signup = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, status } = req.body;
        const result = await authService.signup({
            firstName,
            lastName,
            email,
            password,
            status
        });
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const profile = async (req: Request, res: Response) => {
    const user = (req as any).user;
    res.json({ message: "Protected profile", user });
};

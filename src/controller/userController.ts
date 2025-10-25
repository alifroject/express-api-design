import { Request, Response } from "express";
import * as userService from "../service/userService";

export const getUser = async (req: Request, res: Response) => {
    try {
        const users: any = await userService.getAllUsers();
        res.json(users);

    } catch (error) {
        res.status(500).json({ error: "Failed to get users" });
    };

}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = await userService.createUser({ name, email });
        res.status(201).json(user)

    } catch (error) {
        res.status(500).json({ error: "Failed to create users" });
    }
}
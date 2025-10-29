import { Request, Response } from "express";
import * as userService from "../service/userService";

import { createUserSchema, updateUserSchema } from "../schemas/userSchema";

export const getUser = async (req: Request, res: Response) => {
    try {

        const users = await userService.getAllUsers();
        res.json(users);

    } catch (error) {
        res.status(500).json({ error: "Failed to get users" });
    };

}

export const getUserById = async (req: Request, res: Response) => {
    try {   

        const id = Number(req.params.id);
        const user = await userService.getUserById(id);
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "Failed to get users by id" });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {

        const parsed = createUserSchema.parse(req.body)
        const user = await userService.createUser(parsed);
        res.status(201).json(user)

    } catch (error) {
        res.status(500).json({ error: "Failed to create users" });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const parsed = updateUserSchema.parse(req.body)
        const user = await userService.updateUser(id, parsed)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await userService.deleteUser(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
}
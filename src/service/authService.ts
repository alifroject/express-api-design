import { PrismaClient, status } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret";


export const signup = async (firstName: string, email: string, password: string) => {
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            firstName,
            email,
            password: hashed,
            status: status.active,
        },
    });

    return user;
};



export const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid password");
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    return { user, token };
};
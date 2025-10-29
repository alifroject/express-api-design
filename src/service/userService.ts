import { PrismaClient } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "../schemas/userSchema";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    return await prisma.user.findMany();
}

export const getUserById = async (id: number) => {
    return await prisma.user.findUnique(
        {
            where: { id },
        }
    )
}

export const createUser = async (data: CreateUserDto) => {
    const { firstName, lastName = "", email, password, status: userStatus = "active" } = data;

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName || "",
            email: email,
            password: hashed,
            status: (data.status ?? "active") 

        }
    });

    return user;

}

export const updateUser = async (id: number, data: UpdateUserDto) => {
    return await prisma.user.update(
        {
            where: { id },
            data,
        }
    )
}


export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: { id }
    })
} 
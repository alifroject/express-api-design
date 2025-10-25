import { PrismaClient } from "../generated/prisma";
import { createUserDto, updateUserDto } from "../schemas/userSchema";

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

export const createUser = async (data: createUserDto) => {
    return await prisma.user.create(
        {
            data
        }
    )
}

export const updateUser = async (id: number, data: updateUserDto) => {
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
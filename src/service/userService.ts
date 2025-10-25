import { PrismaClient } from "../generated/prisma";

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

export const createUser = async (data: { name: string, email: string }) => {
    return await prisma.user.create(
        {
            data
        }
    )
}


export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: { id }
    })
} 
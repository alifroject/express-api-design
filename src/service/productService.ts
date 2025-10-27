import { PrismaClient } from "@prisma/client";


//zod
import { createProductDto, updateProdcutDto } from "../schemas/productSchema";


const prisma = new PrismaClient();

export const getAllProducts = async ({ limit, cursor }: { limit: number, cursor?: number }) => {


    const products = await prisma.product.findMany({
        take: limit,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { id: 'asc' }
    })

    const nextCursor = products.length > 0 ? products[products.length - 1].id : null; //taking last id in one batch

    return {data: products, nextCursor}
};


export const getProductById = async (id: number) => {
    return await prisma.product.findUnique(
        { where: { id } }
    )
}


export const createProduct = async (data: createProductDto) => {
    return await prisma.product.create(
        {
            data
        }
    )
}

export const updateProduct = async (id: number, data: updateProdcutDto) => {
    return await prisma.product.update(
        {
            where: { id },
            data,
        }
    )
}

export const deleteProduct = async (id: number) => {
    return await prisma.product.delete({
        where: { id }
    })
}
import { Request, Response } from "express";
import * as productService from "../service/productService"
import { createProductSchema, UpdateProductSchema } from "../schemas/productSchema";


export const getProduct = async (req: Request, res: Response) => {
    try {
        //pagination -- with cursor
        const limit = Number(req.query.limit) || 10;
        const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;


        //read filter from query string
        const filters = {
            category: req.query.category as string | undefined,
            minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
            maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        }


        const { data, nextCursor } = await productService.getAllProducts({ limit, cursor, filters });

        res.json({
            limit,
            nextCursor,
            data,
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to get products" });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const product = await productService.getProductById(id);
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: "Failed to get user by id" });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const pasred = createProductSchema.parse(req.body);
        const product = await productService.createProduct(pasred)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const parsed = UpdateProductSchema.parse(req.body);
        const product = await productService.updateProduct(id, parsed)
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: "Failed to update product" });

    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await productService.deleteProduct(id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
}
import { z } from "zod";


export const createProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().positive("Price must be greater than 0"),
    stock: z.number().int().min(0, "Stock cannot be negative"),
    description: z.string().optional(),
});


export const UpdateProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().positive("Price must be greater than 0"),
    stock: z.number().int().min(0, "Stock cannot be negative"),
    description: z.string().optional(),
});



export type createProductDto = z.infer<typeof createProductSchema>;
export type updateProdcutDto = z.infer<typeof UpdateProductSchema>;
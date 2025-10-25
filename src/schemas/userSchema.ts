import { z } from "zod";


export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email")
})

export const updateUserShcema = z.object({

    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email")
})


export type createUserDto = z.infer<typeof createUserSchema>;
export type updateUserDto = z.infer<typeof createUserSchema>;
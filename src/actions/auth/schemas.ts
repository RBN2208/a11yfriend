import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." })
});

export const oneTimeLoginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" })
});

export const passwordSchema = z.object({
    newPassword: z.string().min(1, { message: "Password must be at least 1 characters long." })
});
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string()
        .max(254, { message: "Email must not exceed 254 characters" })
        .email({ message: "Please enter a valid email address" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(128, { message: "Password must not exceed 128 characters" }),
});

export const oneTimeLoginSchema = z.object({
    email: z.string()
        .max(254, { message: "Email must not exceed 254 characters" })
        .email({ message: "Please enter a valid email address" }),
});

export const emailSchema = z
    .string({
        message: 'Please provide an email'
    })
    .max(254, {
        message: 'Email must not exceed 254 characters'
    })
    .email({
        message: 'Please provide a valid email'
    });

export const passwordSchema = z
    .string({
        message: 'Please provide a password'
    })
    .min(8, {
        message: "Password must be at least 8 characters long"
    })
    .max(128, {
        message: "Password must not exceed 128 characters"
    })
    .refine(password => password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/), {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    });

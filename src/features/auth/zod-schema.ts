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


export const emailSchema = z
    .string({
        message: 'Please provide an email'
    })
    .email({
        message: 'Please provide a valid email'
    });


export const passwordSchemaRegister = z
    .string({
        message: 'Please provide an password'
    })
    .min(8, {
        message: "Password must be at least 8 characters long"
    })
    .refine(password => password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/), {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    })


export const passwordSchemaLogin = z
    .string().min(1, {
        message: "Please provide an password"
    })

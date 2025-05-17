import * as z from 'zod';

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


export const createAuditSchema = z.object({
  name: z.string().min(1, { message: "Please provide a name" }),
  description: z.string().min(1, { message: "Please provide a description" }),
  status: z.string(),
  customer: z.string().min(1, { message: "Please add a customer name" }),
  project_name: z.string().min(1, { message: "Please add a project name" }),
  module: z.string().min(1, { message: "Please add a module name" }),
  version: z.enum(['2.0', '2.1', '2.2'], { message: 'Please select a version'}),
  conformance: z.enum(['A', 'AA', 'AAA'], { message: 'Please select a conformance level'}),
  miscellaneous: z.string().min(1, { message: "Please add any other information you want to add" })
});
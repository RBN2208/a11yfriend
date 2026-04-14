import * as z from 'zod';

export const createAuditSchema = z.object({
  name: z.string()
    .min(1, { message: "Please provide a name" })
    .max(255, { message: "Name must not exceed 255 characters" }),
  description: z.string()
    .min(1, { message: "Please provide a description" })
    .max(2000, { message: "Description must not exceed 2000 characters" }),
  status: z.string().max(50, { message: "Status must not exceed 50 characters" }),
  conformance: z.enum(['A', 'AA', 'AAA'], { message: 'Please select a conformance level' }),
});

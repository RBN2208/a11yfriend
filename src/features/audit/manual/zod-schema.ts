import * as z from 'zod';

export const createAuditSchema = z.object({
  name: z.string().min(1, { message: "Please provide a name" }),
  description: z.string().min(1, { message: "Please provide a description" }),
  status: z.string(),
  conformance: z.enum(['A', 'AA', 'AAA'], { message: 'Please select a conformance level'})
});

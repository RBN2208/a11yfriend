import * as z from 'zod';

export const createReportSchema = z.object({
  name: z.string().min(1, { message: "Please provide a name" }),
  description: z.string().min(1, { message: "Please provide a description" })
});

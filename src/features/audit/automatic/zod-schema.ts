import * as z from 'zod';

export const createReportSchema = z.object({
  name: z.string().min(1, { message: "Please provide a name" }),
  description: z.string().min(1, { message: "Please provide a description" }),
  urls: z.array(z.object({ url: z.string().url({ message: "Please provide a valid URL" }) })).min(1, { message: "Please add at least one URL" })
});

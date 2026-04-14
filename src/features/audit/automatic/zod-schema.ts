import * as z from 'zod';

const safeUrlSchema = z
  .string()
  .url({ message: "Please provide a valid URL" })
  .max(2048, { message: "URL must not exceed 2048 characters" })
  .refine(
    (url) => /^https?:\/\//i.test(url),
    { message: "Only http:// and https:// URLs are allowed" }
  );

export const createReportSchema = z.object({
  name: z.string()
    .min(1, { message: "Please provide a name" })
    .max(255, { message: "Name must not exceed 255 characters" }),
  description: z.string()
    .min(1, { message: "Please provide a description" })
    .max(2000, { message: "Description must not exceed 2000 characters" }),
  urls: z
    .array(z.object({ url: safeUrlSchema }))
    .min(1, { message: "Please add at least one URL" })
    .max(50, { message: "Maximum 50 URLs allowed" }),
});

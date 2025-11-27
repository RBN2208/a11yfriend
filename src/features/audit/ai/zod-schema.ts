import * as z from 'zod';

export const aiReviewSchema = z.object({
  code: z.string().min(1).max(10),
  description: z.string().min(10)
})

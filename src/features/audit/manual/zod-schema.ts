import * as z from 'zod';

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

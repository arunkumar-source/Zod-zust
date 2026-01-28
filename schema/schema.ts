import { z } from "zod";


export const WorkSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  checked: z.boolean(),
});

export type Work = z.infer<typeof WorkSchema>;

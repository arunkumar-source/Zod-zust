import { z } from "zod";


export const WorkSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  status:z.enum(["todo","in-progress","done"]),
  discription: z.string().optional(),
});

export type Work = z.infer<typeof WorkSchema>;

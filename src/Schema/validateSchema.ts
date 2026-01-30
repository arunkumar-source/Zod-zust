import { z } from "zod"

export const statusEnum = z.enum(["todo", "inprogress", "done"])

export const workSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Title is required"),
  status: statusEnum,
  createdAt: z.string(),
})

export type Work = z.infer<typeof workSchema>

import { z } from "zod";

export const chatsSchema = z.object({
  id: z.string().uuid().optional(),
  role: z.string().min(1),
  content: z.string().nullable().optional(),
  user: z.boolean(),
});

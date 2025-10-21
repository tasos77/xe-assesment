import z from 'zod'

export const SearchRequestSchema = z.object({
  input: z.string().min(3).max(100)
})

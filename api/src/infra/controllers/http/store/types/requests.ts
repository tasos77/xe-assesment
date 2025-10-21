import z from 'zod'

export const StoreRequestSchema = z.object({
  title: z.string(),
  type: z.enum(['Rent', 'Buy', 'Exchange', 'Donation']),
  area: z.string(),
  amount: z.number().min(0),
  description: z.string().optional(),
  placeId: z.string()
})

export type StoreData = z.infer<typeof StoreRequestSchema>

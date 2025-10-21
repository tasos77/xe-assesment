import z from 'zod'

const AdResponseSchema = z.array(
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    type: z.enum(['Rent', 'Buy', 'Exchange', 'Donation']),
    area: z.string(),
    amount: z.string(),
    description: z.string(),
    place_id: z.string(),
    created_at: z.string().datetime()
  })
)

export type AdResponse = z.infer<typeof AdResponseSchema>

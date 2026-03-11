import z from "zod"

export const PROJECT_STATUSES =["draft", "active", "finished"] as const

export const projectSchema = z.object({
    name: z.string().min(1),
    status: z.enum(PROJECT_STATUSES),
    description: z.string()
     .min(1, 'Description is required')  // ← Rejects empty strings
     .min(10, 'Description must be at least 10 characters'),
    notifications: z.object({
        email: z.boolean(),
        sms: z.boolean(),
        push: z.boolean(),
    }),
    users: z
           .array(z.object({email: z.email()}))
           .min(1)
           .max(5)
})
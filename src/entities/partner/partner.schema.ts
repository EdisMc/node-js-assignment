import { z } from 'zod';

export const PartnerCreateSchema = z.object({
    name: z
        .string()
        .min(1, 'Partner name is required')
        .max(255, 'Partner name too long'),
    type: z.enum(['supplier', 'customer'], {
        error: 'Type must be supplier or customer',
    }),
    companyId: z.string().uuid('Invalid company ID'),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const PartnerUpdateSchema = z.object({
    id: z.string().uuid('Invalid partner ID'),
    name: z
        .string()
        .min(1, 'Partner name is required')
        .max(255, 'Partner name too long'),
    type: z.enum(['supplier', 'customer'], {
        error: 'Type must be supplier or customer',
    }),
    companyId: z.string().uuid('Invalid company ID'),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const PartnerParamsSchema = z.object({
    id: z.string().uuid('Invalid partner ID'),
});

export type PartnerCreateType = z.infer<typeof PartnerCreateSchema>;
export type PartnerUpdateType = z.infer<typeof PartnerUpdateSchema>;

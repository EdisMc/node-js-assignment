import { z } from 'zod';

export const CompanyCreateSchema = z.object({
    name: z
        .string()
        .min(1, 'Company name is required')
        .max(255, 'Company name too long'),
    address: z.string().min(1, 'Address is required'),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const CompanyUpdateSchema = z.object({
    id: z.string().uuid('Invalid company ID'),
    name: z
        .string()
        .min(1, 'Company name is required')
        .max(255, 'Company name too long'),
    address: z.string().min(1, 'Address is required'),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const CompanyParamsSchema = z.object({
    id: z.string().uuid('Invalid company ID'),
});

export type CompanyCreateType = z.infer<typeof CompanyCreateSchema>;
export type CompanyUpdateType = z.infer<typeof CompanyUpdateSchema>;

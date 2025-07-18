import { z } from 'zod';

export const UserCreateSchema = z.object({
    firstName: z
        .string()
        .min(1, 'First name is required')
        .max(100, 'First name too long'),
    lastName: z
        .string()
        .min(1, 'Last name is required')
        .max(100, 'Last name too long'),
    email: z.string().email('Invalid email format'),
    companyId: z.string().uuid('Invalid company ID'),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const UserUpdateSchema = z.object({
    id: z.string().uuid('Invalid user ID'),
    firstName: z
        .string()
        .min(1, 'First name is required')
        .max(100, 'First name too long'),
    lastName: z
        .string()
        .min(1, 'Last name is required')
        .max(100, 'Last name too long'),
    email: z.string().email('Invalid email format'),
    companyId: z.string().uuid('Invalid company ID'),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const UserParamsSchema = z.object({
    id: z.string().uuid('Invalid user ID'),
});

export type UserCreateType = z.infer<typeof UserCreateSchema>;
export type UserUpdateType = z.infer<typeof UserUpdateSchema>;

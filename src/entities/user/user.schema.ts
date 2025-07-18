import { z } from 'zod';

export const UserCreateSchema = z.object({
    email: z.email('Invalid email format'),
    companyId: z.uuid('Invalid company ID'),
});

export const UserUpdateSchema = z.object({
    id: z.uuid('Invalid user ID'),
    email: z.email('Invalid email format'),
    companyId: z.uuid('Invalid company ID'),
});

export const UserParamsSchema = z.object({
    id: z.uuid('Invalid user ID'),
});

export type UserCreateType = z.infer<typeof UserCreateSchema>;
export type UserUpdateType = z.infer<typeof UserUpdateSchema>;

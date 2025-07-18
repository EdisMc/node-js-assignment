import { z } from 'zod';

export const WarehouseCreateSchema = z.object({
    name: z
        .string()
        .min(1, 'Warehouse name is required')
        .max(255, 'Warehouse name too long'),
    location: z
        .string()
        .min(1, 'Location is required')
        .max(255, 'Location too long'),
    companyId: z.uuid('Invalid company ID'),
    supportType: z.enum(['solid', 'liquid'], {
        message: 'Support type must be solid or liquid',
    }),
});

export const WarehouseUpdateSchema = z.object({
    id: z.uuid('Invalid warehouse ID'),
    name: z
        .string()
        .min(1, 'Warehouse name is required')
        .max(255, 'Warehouse name too long'),
    location: z
        .string()
        .min(1, 'Location is required')
        .max(255, 'Location too long'),
    companyId: z.uuid('Invalid company ID'),
    supportType: z.enum(['solid', 'liquid'], {
        message: 'Support type must be solid or liquid',
    }),
});

export const WarehouseParamsSchema = z.object({
    id: z.uuid('Invalid warehouse ID'),
});

export type WarehouseCreateType = z.infer<typeof WarehouseCreateSchema>;
export type WarehouseUpdateType = z.infer<typeof WarehouseUpdateSchema>;

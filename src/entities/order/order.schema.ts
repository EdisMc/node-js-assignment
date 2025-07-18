import { z } from 'zod';

export const OrderCreateSchema = z.object({
    warehouseId: z.string().uuid('Invalid warehouse ID'),
    partnerId: z.string().uuid('Invalid partner ID'),
    companyId: z.string().uuid('Invalid company ID'),
    date: z.string().datetime('Invalid date format'),
    type: z.enum(['delivery', 'shipment'], {
        message: 'Type must be delivery or shipment',
    }),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const OrderUpdateSchema = z.object({
    id: z.string().uuid('Invalid order ID'),
    warehouseId: z.string().uuid('Invalid warehouse ID'),
    partnerId: z.string().uuid('Invalid partner ID'),
    companyId: z.string().uuid('Invalid company ID'),
    date: z.string().datetime('Invalid date format'),
    type: z.enum(['delivery', 'shipment'], {
        message: 'Type must be delivery or shipment',
    }),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const OrderParamsSchema = z.object({
    id: z.string().uuid('Invalid order ID'),
});

export type OrderCreateType = z.infer<typeof OrderCreateSchema>;
export type OrderUpdateType = z.infer<typeof OrderUpdateSchema>;

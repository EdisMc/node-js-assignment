import { z } from 'zod';

export const OrderCreateSchema = z.object({
    warehouseId: z.uuid('Invalid warehouse ID'),
    partnerId: z.uuid('Invalid partner ID'),
    companyId: z.uuid('Invalid company ID'),
    date: z.date('Invalid date format'),
    type: z.enum(['delivery', 'shipment'], {
        message: 'Type must be delivery or shipment',
    }),
});

export const OrderUpdateSchema = z.object({
    id: z.uuid('Invalid order ID'),
    warehouseId: z.uuid('Invalid warehouse ID'),
    partnerId: z.uuid('Invalid partner ID'),
    companyId: z.uuid('Invalid company ID'),
    date: z.date('Invalid date format'),
    type: z.enum(['delivery', 'shipment'], {
        message: 'Type must be delivery or shipment',
    }),
});

export const OrderParamsSchema = z.object({
    id: z.uuid('Invalid order ID'),
});

export type OrderCreateType = z.infer<typeof OrderCreateSchema>;
export type OrderUpdateType = z.infer<typeof OrderUpdateSchema>;

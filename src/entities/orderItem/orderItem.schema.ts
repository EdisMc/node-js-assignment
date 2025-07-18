import { z } from 'zod';

export const OrderItemCreateSchema = z.object({
    quantity: z
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be positive'),
    productId: z.string().uuid('Invalid product ID'),
    orderId: z.string().uuid('Invalid order ID'),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const OrderItemUpdateSchema = z.object({
    id: z.string().uuid('Invalid order item ID'),
    quantity: z
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be positive'),
    productId: z.string().uuid('Invalid product ID'),
    orderId: z.string().uuid('Invalid order ID'),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const OrderItemParamsSchema = z.object({
    id: z.string().uuid('Invalid order item ID'),
});

export type OrderItemCreateType = z.infer<typeof OrderItemCreateSchema>;
export type OrderItemUpdateType = z.infer<typeof OrderItemUpdateSchema>;

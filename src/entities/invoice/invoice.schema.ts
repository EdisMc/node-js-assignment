import { z } from 'zod';

export const InvoiceCreateSchema = z.object({
    issueDate: z.string().datetime('Invalid date format'),
    orderId: z.string().uuid('Invalid order ID'),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const InvoiceUpdateSchema = z.object({
    id: z.string().uuid('Invalid invoice ID'),
    issueDate: z.string().datetime('Invalid date format'),
    orderId: z.string().uuid('Invalid order ID'),
    modifiedBy: z.string().uuid('Invalid user ID'),
});

export const InvoiceParamsSchema = z.object({
    id: z.string().uuid('Invalid invoice ID'),
});

export type InvoiceCreateType = z.infer<typeof InvoiceCreateSchema>;
export type InvoiceUpdateType = z.infer<typeof InvoiceUpdateSchema>;

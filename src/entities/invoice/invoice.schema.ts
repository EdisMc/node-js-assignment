import { z } from 'zod';

export const InvoiceCreateSchema = z.object({
    issueDate: z.date('Invalid date format'),
    orderId: z.uuid('Invalid order ID'),
});

export const InvoiceUpdateSchema = z.object({
    id: z.uuid('Invalid invoice ID'),
    issueDate: z.date('Invalid date format'),
    orderId: z.uuid('Invalid order ID'),
});

export const InvoiceParamsSchema = z.object({
    id: z.uuid('Invalid invoice ID'),
});

export type InvoiceCreateType = z.infer<typeof InvoiceCreateSchema>;
export type InvoiceUpdateType = z.infer<typeof InvoiceUpdateSchema>;

import { z } from 'zod';

export const ProductCreateSchema = z.object({
    name: z
        .string()
        .min(1, 'Product name is required')
        .max(255, 'Product name too long'),
    prodType: z.enum(['solid', 'liquid'], {
        error: 'Product type must be solid or liquid',
    }),
    price: z.number().positive('Price must be positive'),
    companyId: z.uuid('Invalid company ID'),
    warehouseId: z.uuid('Invalid warehouse ID'),
});

export const ProductUpdateSchema = z.object({
    id: z.uuid('Invalid product ID'),
    name: z
        .string()
        .min(1, 'Product name is required')
        .max(255, 'Product name too long'),
    prodType: z.enum(['solid', 'liquid'], {
        error: 'Product type must be solid or liquid',
    }),
    price: z.number().positive('Price must be positive'),
    companyId: z.uuid('Invalid company ID'),
    warehouseId: z.uuid('Invalid warehouse ID'),
});

export const ProductParamsSchema = z.object({
    id: z.uuid('Invalid product ID'),
});

export type ProductCreateType = z.infer<typeof ProductCreateSchema>;
export type ProductUpdateType = z.infer<typeof ProductUpdateSchema>;

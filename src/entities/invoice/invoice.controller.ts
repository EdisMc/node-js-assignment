import { Request, Response, Router } from 'express';

import { validateBody, validateParams } from '../../middlewares/validation.js';
import {
	InvoiceCreateSchema,
	InvoiceParamsSchema,
	InvoiceUpdateSchema,
} from './invoice.schema.js';
import { InvoiceService } from './invoice.service.js';

const invoiceController = Router();
const invoiceService = new InvoiceService();

invoiceController.get('/', async (req: Request, res: Response) => {
    try {
        const invoices = await invoiceService.getAll();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json(error);
    }
});

invoiceController.get(
    '/:id',
    validateParams(InvoiceParamsSchema),
    async (req: Request, res: Response) => {
        const invoiceId = req.params.id;
        try {
            const invoice = await invoiceService.getById(invoiceId);
            if (!invoice) {
                return res.status(404).json({message: 'Invoice not found'});
            }
            res.status(200).json(invoice);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

invoiceController.post(
    '/',
    validateBody(InvoiceCreateSchema),
    async (req: Request, res: Response) => {
        const newInvoiceInfo = req.body;
        try {
            const newInvoice = await invoiceService.create(newInvoiceInfo);
            res.status(201).json(newInvoice);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

invoiceController.put(
    '/:id',
    validateParams(InvoiceParamsSchema),
    validateBody(InvoiceUpdateSchema),
    async (req: Request, res: Response) => {
        const invoiceId = req.params.id;
        const updatedInfo = req.body;
        try {
            const updatedInvoice = await invoiceService.update(
                invoiceId,
                updatedInfo,
            );
            res.status(200).json(updatedInvoice);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

invoiceController.delete(
    '/:id',
    validateParams(InvoiceParamsSchema),
    async (req: Request, res: Response) => {
        const invoiceId = req.params.id;
        try {
            await invoiceService.delete(invoiceId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

export default invoiceController;

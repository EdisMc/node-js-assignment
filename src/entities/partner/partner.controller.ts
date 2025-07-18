import { Request, Response, Router } from 'express';

import { validateBody, validateParams } from '../../middlewares/validation.js';
import {
	PartnerCreateSchema,
	PartnerParamsSchema,
	PartnerUpdateSchema,
} from './partner.schema.js';
import { PartnerService } from './partner.service.js';

const partnerController = Router();
const partnerService = new PartnerService();

partnerController.get('/', async (req: Request, res: Response) => {
    try {
        const partners = await partnerService.getAll();
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json(error);
    }
});

partnerController.get(
    '/:id',
    validateParams(PartnerParamsSchema),
    async (req: Request, res: Response) => {
        const partnerId = req.params.id;
        try {
            const partner = await partnerService.getById(partnerId);
            if (!partner) {
                return res.status(404).json({message: 'Partner not found'});
            }
            res.status(200).json(partner);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

partnerController.post(
    '/',
    validateBody(PartnerCreateSchema),
    async (req: Request, res: Response) => {
        const newPartnerInfo = req.body;
        try {
            const newPartner = await partnerService.create(newPartnerInfo);
            res.status(201).json(newPartner);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

partnerController.put(
    '/:id',
    validateParams(PartnerParamsSchema),
    validateBody(PartnerUpdateSchema),
    async (req: Request, res: Response) => {
        const partnerId = req.params.id;
        const updatedInfo = req.body;
        try {
            const updatedPartner = await partnerService.update(
                partnerId,
                updatedInfo,
            );
            res.status(200).json(updatedPartner);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

partnerController.delete(
    '/:id',
    validateParams(PartnerParamsSchema),
    async (req: Request, res: Response) => {
        const partnerId = req.params.id;
        try {
            await partnerService.delete(partnerId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

partnerController.get(
    '/analytics/top-customer',
    async (req: Request, res: Response) => {
        try {
            const topCustomer =
                await partnerService.getCustomerWithMostOrders();
            if (!topCustomer) {
                return res
                    .status(404)
                    .json({message: 'No customer orders found'});
            }
            res.status(200).json(topCustomer);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

export default partnerController;

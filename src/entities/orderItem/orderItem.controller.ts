import { Request, Response, Router } from 'express';

import { validateBody, validateParams } from '../../middlewares/validation.js';
import {
	OrderItemCreateSchema,
	OrderItemParamsSchema,
	OrderItemUpdateSchema,
} from './orderItem.schema.js';
import { OrderItemService } from './orderItem.service.js';

const orderItemController = Router();
const orderItemService = new OrderItemService();

orderItemController.get('/', async (req: Request, res: Response) => {
    try {
        const orderItems = await orderItemService.getAll();
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json(error);
    }
});

orderItemController.get(
    '/:id',
    validateParams(OrderItemParamsSchema),
    async (req: Request, res: Response) => {
        const orderItemId = req.params.id;
        try {
            const orderItem = await orderItemService.getById(orderItemId);
            if (!orderItem) {
                return res.status(404).json({message: 'OrderItem not found'});
            }
            res.status(200).json(orderItem);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

orderItemController.post(
    '/',
    validateBody(OrderItemCreateSchema),
    async (req: Request, res: Response) => {
        const newOrderItemInfo = req.body;
        try {
            const newOrderItem = await orderItemService.create(
                newOrderItemInfo,
            );
            res.status(201).json(newOrderItem);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

orderItemController.put(
    '/:id',
    validateParams(OrderItemParamsSchema),
    validateBody(OrderItemUpdateSchema),
    async (req: Request, res: Response) => {
        const orderItemId = req.params.id;
        const updatedInfo = req.body;
        try {
            const updatedOrderItem = await orderItemService.update(
                orderItemId,
                updatedInfo,
            );
            res.status(200).json(updatedOrderItem);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

orderItemController.delete(
    '/:id',
    validateParams(OrderItemParamsSchema),
    async (req: Request, res: Response) => {
        const orderItemId = req.params.id;
        try {
            await orderItemService.delete(orderItemId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

export default orderItemController;

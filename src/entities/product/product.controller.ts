import { Request, Response, Router } from 'express';

import { validateBody, validateParams } from '../../middlewares/validation.js';
import {
	ProductCreateSchema,
	ProductParamsSchema,
	ProductUpdateSchema,
} from './product.schema.js';
import { ProductService } from './product.service.js';

const productController = Router();
const productService = new ProductService();

productController.get('/', async (req: Request, res: Response) => {
    try {
        const products = await productService.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

productController.get(
    '/:id',
    validateParams(ProductParamsSchema),
    async (req: Request, res: Response) => {
        const productId = req.params.id;
        try {
            const product = await productService.getById(productId);
            if (!product) {
                return res.status(404).json({message: 'Product not found'});
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

productController.post(
    '/',
    validateBody(ProductCreateSchema),
    async (req: Request, res: Response) => {
        const newProductInfo = req.body;
        try {
            const newProduct = await productService.create(newProductInfo);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

productController.put(
    '/:id',
    validateParams(ProductParamsSchema),
    validateBody(ProductUpdateSchema),
    async (req: Request, res: Response) => {
        const productId = req.params.id;
        const updatedInfo = req.body;
        try {
            const updatedProduct = await productService.update(
                productId,
                updatedInfo,
            );
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

productController.delete(
    '/:id',
    validateParams(ProductParamsSchema),
    async (req: Request, res: Response) => {
        const productId = req.params.id;
        try {
            await productService.delete(productId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

productController.get(
    '/analytics/best-selling',
    async (req: Request, res: Response) => {
        try {
            const bestSelling = await productService.getBestSellingProduct();
            if (!bestSelling) {
                return res.status(404).json({message: 'No sales data found'});
            }
            res.status(200).json(bestSelling);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

productController.get(
    '/analytics/highest-stock',
    async (req: Request, res: Response) => {
        try {
            const highestStock =
                await productService.getProductsWithHighestStock();
            if (!highestStock || highestStock.length === 0) {
                return res.status(404).json({message: 'No stock data found'});
            }
            res.status(200).json(highestStock);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

export default productController;

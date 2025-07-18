import { Router } from 'express';

import companyController from '../entities/company/company.controller.js';
import invoiceController from '../entities/invoice/invoice.controller.js';
import orderController from '../entities/order/order.controller.js';
import orderItemController from '../entities/orderItem/orderItem.controller.js';
import partnerController from '../entities/partner/partner.controller.js';
import productController from '../entities/product/product.controller.js';
import userController from '../entities/user/user.controller.js';
import warehouseController from '../entities/warehouse/warehouse.controller.js';

const router = Router();

router.use('/companies', companyController);
router.use('/users', userController);
router.use('/warehouses', warehouseController);
router.use('/products', productController);
router.use('/partners', partnerController);
router.use('/orders', orderController);
router.use('/order-items', orderItemController);
router.use('/invoices', invoiceController);

export default router;

import { sequelize } from '../../config/database.js';
import Company from '../entities/company/company.model.js';
import { Invoice } from '../entities/invoice/invoice.model.js';
import { Order, OrderType } from '../entities/order/order.model.js';
import { OrderItem } from '../entities/orderItem/orderItem.model.js';
import { Partner, PartnerType } from '../entities/partner/partner.model.js';
import { Product } from '../entities/product/product.model.js';
import User from '../entities/user/user.model.js';
import {
	SupportType,
	Warehouse,
} from '../entities/warehouse/warehouse.model.js';
import { setupAssociations } from './associations.js';

Company.initModel(sequelize);
User.initModel(sequelize);
Warehouse.initModel(sequelize);
Product.initModel(sequelize);
Partner.initModel(sequelize);
Order.initModel(sequelize);
OrderItem.initModel(sequelize);
Invoice.initModel(sequelize);

setupAssociations();

export {
    Company,
    User,
    Warehouse,
    Product,
    Partner,
    Order,
    OrderItem,
    Invoice,
    SupportType,
    PartnerType,
    OrderType,
    setupAssociations,
    sequelize,
};

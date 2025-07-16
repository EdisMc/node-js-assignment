import { sequelize } from '../config/database.js';
import { Company } from './Company.js';
import { Invoice } from './Invoice.js';
import { Order, OrderType } from './Order.js';
import { OrderItem } from './OrderItem.js';
import { Partner, PartnerType } from './Partner.js';
import { Product } from './Product.js';
import { User } from './User.js';
import { SupportType, Warehouse } from './Warehouse.js';

Company.initModel(sequelize);
User.initModel(sequelize);
Warehouse.initModel(sequelize);
Product.initModel(sequelize);
Partner.initModel(sequelize);
Order.initModel(sequelize);
OrderItem.initModel(sequelize);
Invoice.initModel(sequelize);

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
};

export function setupAssociations() {
    Company.hasMany(User, {foreignKey: 'companyId'});
    Company.hasMany(Warehouse, {foreignKey: 'companyId'});
    Company.hasMany(Product, {foreignKey: 'companyId'});
    Company.hasMany(Partner, {foreignKey: 'companyId'});
    Company.hasMany(Order, {foreignKey: 'companyId'});

    User.belongsTo(Company, {foreignKey: 'companyId'});
    User.hasMany(Company, {foreignKey: 'modifiedBy', as: 'modifiedCompanies'});
    User.hasMany(User, {foreignKey: 'modifiedBy', as: 'modifiedUsers'});
    User.hasMany(Warehouse, {
        foreignKey: 'modifiedBy',
        as: 'modifiedWarehouses',
    });
    User.hasMany(Product, {foreignKey: 'modifiedBy', as: 'modifiedProducts'});
    User.hasMany(Partner, {foreignKey: 'modifiedBy', as: 'modifiedPartners'});
    User.hasMany(Order, {foreignKey: 'modifiedBy', as: 'modifiedOrders'});
    User.hasMany(OrderItem, {
        foreignKey: 'modifiedBy',
        as: 'modifiedOrderItems',
    });
    User.hasMany(Invoice, {foreignKey: 'modifiedBy', as: 'modifiedInvoices'});

    Warehouse.belongsTo(Company, {foreignKey: 'companyId'});
    Warehouse.hasMany(Product, {foreignKey: 'warehouseId'});
    Warehouse.hasMany(Order, {foreignKey: 'warehouseId'});

    Product.belongsTo(Company, {foreignKey: 'companyId'});
    Product.belongsTo(Warehouse, {foreignKey: 'warehouseId'});
    Product.hasMany(OrderItem, {foreignKey: 'productId'});

    Partner.belongsTo(Company, {foreignKey: 'companyId'});
    Partner.hasMany(Order, {foreignKey: 'partnerId'});

    Order.belongsTo(Company, {foreignKey: 'companyId'});
    Order.belongsTo(Warehouse, {foreignKey: 'warehouseId'});
    Order.belongsTo(Partner, {foreignKey: 'partnerId'});
    Order.hasMany(OrderItem, {foreignKey: 'orderId'});
    Order.hasOne(Invoice, {foreignKey: 'orderId'});

    OrderItem.belongsTo(Order, {foreignKey: 'orderId'});
    OrderItem.belongsTo(Product, {foreignKey: 'productId'});

    Invoice.belongsTo(Order, {foreignKey: 'orderId'});
}

setupAssociations();

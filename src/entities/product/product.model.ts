import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { SupportType } from '../warehouse/warehouse.model.js';

export interface ProductProperties {
    id: string;
    name: string;
    prodType: SupportType;
    price: number;
    companyId: string;
    warehouseId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

export class Product extends Model<
    ProductProperties,
    Optional<ProductProperties, 'id'>
> {
    public static initModel(sequelize: Sequelize): typeof Product {
        Product.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                prodType: {
                    type: DataTypes.ENUM('solid', 'liquid'),
                    allowNull: false,
                    field: 'prodType',
                },
                price: {
                    type: DataTypes.DECIMAL(12, 2),
                    allowNull: false,
                },
                companyId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'companyId',
                },
                warehouseId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'warehouseId',
                },
                createdAt: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                    field: 'createdAt',
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                    field: 'updatedAt',
                },
                deletedAt: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    field: 'deletedAt',
                },
                modifiedBy: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'modifiedBy',
                },
            },
            {
                sequelize,
                tableName: 'products',
                timestamps: true,
                paranoid: true,
            },
        );
        return Product;
    }
}

export default Product;

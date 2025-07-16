import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

import { SupportType } from './Warehouse.js';

interface ProductAttributes {
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

type ProductCreationAttributes = Optional<
    ProductAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class Product
    extends Model<ProductAttributes, ProductCreationAttributes>
    implements ProductAttributes
{
    public id!: string;
    public name!: string;
    public prodType!: SupportType;
    public price!: number;
    public companyId!: string;
    public warehouseId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
    public modifiedBy!: string;

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
                },
                price: {
                    type: DataTypes.DECIMAL(12, 2),
                    allowNull: false,
                },
                companyId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                warehouseId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                modifiedBy: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Product',
                tableName: 'products',
                paranoid: true,
            },
        );
        return Product;
    }
}

import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export enum OrderType {
    DELIVERY = 'delivery',
    SHIPMENT = 'shipment',
}

export interface OrderProperties {
    id: string;
    warehouseId: string;
    partnerId: string;
    companyId: string;
    date: Date;
    type: OrderType;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

export class Order extends Model<
    OrderProperties,
    Optional<OrderProperties, 'id'>
> {
    public static initModel(sequelize: Sequelize): typeof Order {
        Order.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                warehouseId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'warehouseId',
                },
                partnerId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'partnerId',
                },
                companyId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'companyId',
                },
                date: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.ENUM('delivery', 'shipment'),
                    allowNull: false,
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
                tableName: 'orders',
                timestamps: true,
                paranoid: true,
            },
        );
        return Order;
    }
}

export default Order;

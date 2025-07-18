import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface OrderItemProperties {
    id: string;
    quantity: number;
    productId: string;
    orderId: string;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

export class OrderItem extends Model<
    OrderItemProperties,
    Optional<OrderItemProperties, 'id'>
> {
    public static initModel(sequelize: Sequelize): typeof OrderItem {
        OrderItem.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                productId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'productId',
                },
                orderId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'orderId',
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
                tableName: 'order_items',
                timestamps: true,
                paranoid: true,
                createdAt: false,
            },
        );
        return OrderItem;
    }
}

export default OrderItem;

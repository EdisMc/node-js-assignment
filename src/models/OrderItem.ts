import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface OrderItemAttributes {
    id: string;
    quantity: number;
    productId: string;
    orderId: string;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

type OrderItemCreationAttributes = Optional<
    OrderItemAttributes,
    'id' | 'updatedAt' | 'deletedAt'
>;

export class OrderItem
    extends Model<OrderItemAttributes, OrderItemCreationAttributes>
    implements OrderItemAttributes
{
    public id!: string;
    public quantity!: number;
    public productId!: string;
    public orderId!: string;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
    public modifiedBy!: string;

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
                },
                orderId: {
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
                modelName: 'OrderItem',
                tableName: 'order_items',
                paranoid: true,
                createdAt: false,
            },
        );
        return OrderItem;
    }
}

import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export enum OrderType {
    DELIVERY = 'delivery',
    SHIPMENT = 'shipment',
}

interface OrderAttributes {
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

type OrderCreationAttributes = Optional<
    OrderAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class Order
    extends Model<OrderAttributes, OrderCreationAttributes>
    implements OrderAttributes
{
    public id!: string;
    public warehouseId!: string;
    public partnerId!: string;
    public companyId!: string;
    public date!: Date;
    public type!: OrderType;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
    public modifiedBy!: string;

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
                },
                partnerId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                companyId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                date: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.ENUM('delivery', 'shipment'),
                    allowNull: false,
                },
                modifiedBy: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Order',
                tableName: 'orders',
                paranoid: true,
            },
        );
        return Order;
    }
}

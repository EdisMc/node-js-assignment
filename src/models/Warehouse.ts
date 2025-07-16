import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export enum SupportType {
    SOLID = 'solid',
    LIQUID = 'liquid',
}

interface WarehouseAttributes {
    id: string;
    name: string;
    location: string;
    companyId: string;
    supportType: SupportType;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

type WarehouseCreationAttributes = Optional<
    WarehouseAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class Warehouse
    extends Model<WarehouseAttributes, WarehouseCreationAttributes>
    implements WarehouseAttributes
{
    public id!: string;
    public name!: string;
    public location!: string;
    public companyId!: string;
    public supportType!: SupportType;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
    public modifiedBy!: string;

    public static initModel(sequelize: Sequelize): typeof Warehouse {
        Warehouse.init(
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
                location: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                companyId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                supportType: {
                    type: DataTypes.ENUM('solid', 'liquid'),
                    allowNull: false,
                },
                modifiedBy: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Warehouse',
                tableName: 'warehouses',
                paranoid: true,
            },
        );
        return Warehouse;
    }
}

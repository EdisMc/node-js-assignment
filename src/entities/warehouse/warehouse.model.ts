import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export enum SupportType {
    SOLID = 'solid',
    LIQUID = 'liquid',
}

export interface WarehouseProperties {
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

export class Warehouse extends Model<
    WarehouseProperties,
    Optional<WarehouseProperties, 'id'>
> {
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
                    field: 'companyId',
                },
                supportType: {
                    type: DataTypes.ENUM('solid', 'liquid'),
                    allowNull: false,
                    field: 'supportType',
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
                tableName: 'warehouses',
                timestamps: true,
                paranoid: true,
            },
        );
        return Warehouse;
    }
}

export default Warehouse;

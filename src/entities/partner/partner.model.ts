import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export enum PartnerType {
    SUPPLIER = 'supplier',
    CUSTOMER = 'customer',
}

export interface PartnerProperties {
    id: string;
    name: string;
    type: PartnerType;
    companyId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

export class Partner extends Model<
    PartnerProperties,
    Optional<PartnerProperties, 'id'>
> {
    public static initModel(sequelize: Sequelize): typeof Partner {
        Partner.init(
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
                type: {
                    type: DataTypes.ENUM('supplier', 'customer'),
                    allowNull: false,
                },
                companyId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'companyId',
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
                tableName: 'partners',
                timestamps: true,
                paranoid: true,
            },
        );
        return Partner;
    }
}

export default Partner;

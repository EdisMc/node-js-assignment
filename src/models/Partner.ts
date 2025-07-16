import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export enum PartnerType {
    SUPPLIER = 'supplier',
    CUSTOMER = 'customer',
}

interface PartnerAttributes {
    id: string;
    name: string;
    type: PartnerType;
    companyId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

type PartnerCreationAttributes = Optional<
    PartnerAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class Partner
    extends Model<PartnerAttributes, PartnerCreationAttributes>
    implements PartnerAttributes
{
    public id!: string;
    public name!: string;
    public type!: PartnerType;
    public companyId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
    public modifiedBy!: string;

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
                },
                modifiedBy: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Partner',
                tableName: 'partners',
                paranoid: true,
            },
        );
        return Partner;
    }
}

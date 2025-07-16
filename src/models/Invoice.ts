import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface InvoiceAttributes {
    id: string;
    issueDate: Date;
    orderId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

type InvoiceCreationAttributes = Optional<
    InvoiceAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class Invoice
    extends Model<InvoiceAttributes, InvoiceCreationAttributes>
    implements InvoiceAttributes
{
    public id!: string;
    public issueDate!: Date;
    public orderId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
    public modifiedBy!: string;

    public static initModel(sequelize: Sequelize): typeof Invoice {
        Invoice.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                issueDate: {
                    type: DataTypes.DATE,
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
                modelName: 'Invoice',
                tableName: 'invoices',
                paranoid: true,
            },
        );
        return Invoice;
    }
}

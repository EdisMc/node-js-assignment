import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface InvoiceProperties {
    id: string;
    issueDate: Date;
    orderId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

export class Invoice extends Model<
    InvoiceProperties,
    Optional<InvoiceProperties, 'id'>
> {
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
                    field: 'issueDate',
                },
                orderId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    field: 'orderId',
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
                tableName: 'invoices',
                timestamps: true,
                paranoid: true,
            },
        );
        return Invoice;
    }
}

export default Invoice;

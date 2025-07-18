import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface CompanyProperties {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

export class Company extends Model<
    CompanyProperties,
    Optional<CompanyProperties, 'id'>
> {
    public static initModel(sequelize: Sequelize): typeof Company {
        Company.init(
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
                tableName: 'companies',
                timestamps: true,
                paranoid: true,
            },
        );
        return Company;
    }
}

export default Company;

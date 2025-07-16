import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface CompanyAttributes {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

type CompanyCreationAttributes = Optional<
    CompanyAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class Company
    extends Model<CompanyAttributes, CompanyCreationAttributes>
    implements CompanyAttributes
{
    public id!: string;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt?: Date;
    public modifiedBy!: string;

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
                modifiedBy: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Company',
                tableName: 'companies',
                paranoid: true,
            },
        );
        return Company;
    }
}

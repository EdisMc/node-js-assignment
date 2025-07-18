import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UserProperties {
    id: string;
    email: string;
    password: string;
    companyId: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    modifiedBy: string;
}

export class User extends Model<
    UserProperties,
    Optional<UserProperties, 'id'>
> {
    public static initModel(sequelize: Sequelize): typeof User {
        User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING(255),
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
                tableName: 'users',
                timestamps: true,
                paranoid: true,
            },
        );
        return User;
    }
}

export default User;

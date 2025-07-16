import { sequelize } from './database.js';

export const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to database!');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

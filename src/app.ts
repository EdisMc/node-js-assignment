import cors from 'cors';
import express from 'express';

import { sequelize } from './database/index.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', routes);
app.use(errorHandler);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');
        await sequelize.sync({force: false});
        console.log('✅ Database synced');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📊 API available at http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error('❌ Unable to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;

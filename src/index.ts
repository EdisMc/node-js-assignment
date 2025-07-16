import express from 'express';

import { testDbConnection } from './config/testConnection.js';

const app = express();
const port = 3000;

testDbConnection();

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

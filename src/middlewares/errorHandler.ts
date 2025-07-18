import { NextFunction, Request, Response } from 'express';

import { HTTP_STATUS } from '../utils/constants.js';
import ResponseHelper from '../utils/responseHelper.js';

interface SequelizeError extends Error {
    name: string;
    errors?: Array<{
        path: string;
        message: string;
    }>;
}

const errorHandler = (
    err: SequelizeError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
): void => {
    console.error('Error:', err);

    if (err.name === 'SequelizeValidationError') {
        const errors =
            err.errors?.map((error) => ({
                field: error.path,
                message: error.message,
            })) || [];
        ResponseHelper.badRequest(res, 'Validation error', errors);
        return;
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        const errors =
            err.errors?.map((error) => ({
                field: error.path,
                message: `${error.path} already exists`,
            })) || [];
        ResponseHelper.badRequest(res, 'Unique constraint error', errors);
        return;
    }

    if (err.name === 'SequelizeForeignKeyConstraintError') {
        ResponseHelper.badRequest(res, 'Foreign key constraint error');
        return;
    }

    ResponseHelper.error(
        res,
        err.message || 'Internal server error',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
};

export default errorHandler;

import { Response } from 'express';

import { HTTP_STATUS, MESSAGES } from './constants.js';

interface ErrorDetail {
    field?: string;
    message: string;
}

class ResponseHelper {
    static success(
        res: Response,
        data: unknown = null,
        message: string = MESSAGES.SUCCESS,
        statusCode: number = HTTP_STATUS.OK,
    ): void {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    static created(
        res: Response,
        data: unknown = null,
        message: string = MESSAGES.CREATED,
    ): void {
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message,
            data,
        });
    }

    static error(
        res: Response,
        message: string = MESSAGES.INTERNAL_ERROR,
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
        errors: ErrorDetail[] | null = null,
    ): void {
        res.status(statusCode).json({
            success: false,
            message,
            errors,
        });
    }

    static notFound(res: Response, message: string = MESSAGES.NOT_FOUND): void {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            message,
        });
    }

    static badRequest(
        res: Response,
        message: string = MESSAGES.VALIDATION_ERROR,
        errors: ErrorDetail[] | null = null,
    ): void {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message,
            errors,
        });
    }
}

export default ResponseHelper;

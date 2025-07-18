import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const validateBody = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: validationErrors,
                });
            }
            next(error);
        }
    };
};

export const validateParams = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.params);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                return res.status(400).json({
                    success: false,
                    message: 'Invalid parameters',
                    errors: validationErrors,
                });
            }
            next(error);
        }
    };
};

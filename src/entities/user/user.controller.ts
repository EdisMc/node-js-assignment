import { Request, Response, Router } from 'express';

import { validateBody, validateParams } from '../../middlewares/validation.js';
import {
	UserCreateSchema,
	UserParamsSchema,
	UserUpdateSchema,
} from './user.schema.js';
import { UserService } from './user.service.js';

const userController = Router();
const userService = new UserService();

userController.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

userController.get(
    '/:id',
    validateParams(UserParamsSchema),
    async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
            const user = await userService.getById(userId);
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

userController.post(
    '/',
    validateBody(UserCreateSchema),
    async (req: Request, res: Response) => {
        const newUserInfo = req.body;
        try {
            const newUser = await userService.create(newUserInfo);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

userController.put(
    '/:id',
    validateParams(UserParamsSchema),
    validateBody(UserUpdateSchema),
    async (req: Request, res: Response) => {
        const userId = req.params.id;
        const updatedInfo = req.body;
        try {
            const updatedUser = await userService.update(userId, updatedInfo);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

userController.delete(
    '/:id',
    validateParams(UserParamsSchema),
    async (req: Request, res: Response) => {
        const userId = req.params.id;
        try {
            await userService.delete(userId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

export default userController;

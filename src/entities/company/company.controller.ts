import { Request, Response, Router } from 'express';

import { validateBody, validateParams } from '../../middlewares/validation.js';
import {
	CompanyCreateSchema,
	CompanyParamsSchema,
	CompanyUpdateSchema,
} from './company.schema.js';
import { CompanyService } from './company.service.js';

const companyController = Router();
const companyService = new CompanyService();

companyController.get('/', async (req: Request, res: Response) => {
    try {
        const companies = await companyService.getAll();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json(error);
    }
});

companyController.get(
    '/:id',
    validateParams(CompanyParamsSchema),
    async (req: Request, res: Response) => {
        const companyId = req.params.id;
        try {
            const company = await companyService.getById(companyId);
            if (!company) {
                return res.status(404).json({message: 'Company not found'});
            }
            res.status(200).json(company);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

companyController.post(
    '/',
    validateBody(CompanyCreateSchema),
    async (req: Request, res: Response) => {
        const newCompanyInfo = req.body;
        try {
            const newCompany = await companyService.create(newCompanyInfo);
            res.status(201).json(newCompany);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

companyController.put(
    '/:id',
    validateParams(CompanyParamsSchema),
    validateBody(CompanyUpdateSchema),
    async (req: Request, res: Response) => {
        const companyId = req.params.id;
        const updatedInfo = req.body;
        try {
            const updatedCompany = await companyService.update(
                companyId,
                updatedInfo,
            );
            res.status(200).json(updatedCompany);
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

companyController.delete(
    '/:id',
    validateParams(CompanyParamsSchema),
    async (req: Request, res: Response) => {
        const companyId = req.params.id;
        try {
            await companyService.delete(companyId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error);
        }
    },
);

export default companyController;

import { sequelize } from '#database/index.js';
import { QueryTypes } from 'sequelize';

import Partner, { PartnerProperties } from './partner.model.js';

export class PartnerService {
    constructor(private readonly model = Partner) {}

    async getAll(): Promise<Partner[]> {
        return await this.model.findAll();
    }

    async getById(id: string): Promise<Partner | null> {
        return await this.model.findByPk(id);
    }

    async create(partnerData: PartnerProperties): Promise<Partner | null> {
        return await this.model.create(partnerData);
    }

    async update(
        partnerId: string,
        partnerData: PartnerProperties,
    ): Promise<Partner> {
        const [count] = await this.model.update(partnerData, {
            where: {id: partnerId},
        });
        if (count === 0) {
            throw new Error(`Partner with id ${partnerId} not found`);
        }
        const updated = await this.model.findByPk(partnerId);
        if (!updated) {
            throw new Error(`Partner fetch failed after update`);
        }
        return updated;
    }

    async delete(partnerId: string): Promise<void> {
        const partner = await this.model.findByPk(partnerId);
        if (!partner) {
            throw new Error(`Partner with ID ${partnerId} does not exist`);
        }

        await partner.destroy();
    }

    async getCustomerWithMostOrders() {
        const results = await sequelize.query(
            `SELECT p.name AS "customerName",
               p.id AS "customerId",
               COUNT(o.id) AS "totalOrders"
        FROM "partners" p
        JOIN "orders" o ON p.id = o."partnerId"
        WHERE p.type = 'customer'
          AND p."deletedAt" IS NULL
          AND o."deletedAt" IS NULL
        GROUP BY p.name, p.id
        ORDER BY COUNT(o.id) DESC
        LIMIT 1`,
            {type: QueryTypes.SELECT},
        );

        return results?.[0] || null;
    }
}

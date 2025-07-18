import { sequelize } from '#database/index.js';
import { QueryTypes } from 'sequelize';

import Product, { ProductProperties } from './product.model.js';

export class ProductService {
    constructor(private readonly model = Product) {}

    async getAll(): Promise<Product[]> {
        return await this.model.findAll();
    }

    async getById(id: string): Promise<Product | null> {
        return await this.model.findByPk(id);
    }

    async create(productData: ProductProperties): Promise<Product | null> {
        return await this.model.create(productData);
    }

    async update(
        productId: string,
        productData: ProductProperties,
    ): Promise<Product> {
        const [count] = await this.model.update(productData, {
            where: {id: productId},
        });
        if (count === 0) {
            throw new Error(`Product with id ${productId} not found`);
        }
        const updated = await this.model.findByPk(productId);
        if (!updated) {
            throw new Error(`Product fetch failed after update`);
        }
        return updated;
    }

    async delete(productId: string): Promise<void> {
        const product = await this.model.findByPk(productId);
        if (!product) {
            throw new Error(`Product with ID ${productId} does not exist`);
        }

        await product.destroy();
    }

    async getBestSellingProduct() {
        const results = await sequelize.query(
            `SELECT p.name AS "productName",
         SUM(oi.quantity) AS "totalSold"
        FROM "order_items" oi
        JOIN "orders" o ON o.id = oi."orderId"
        JOIN "products" p ON p.id = oi."productId"
        WHERE o.type = 'delivery'
          AND oi."deletedAt" IS NULL
          AND o."deletedAt" IS NULL
          AND p."deletedAt" IS NULL
        GROUP BY p.name
        ORDER BY SUM(oi.quantity) DESC
  `,
            {type: QueryTypes.SELECT},
        );

        return results?.[0] || null;
    }

    async getProductsWithHighestStock() {
        const results = await sequelize.query(
            `
    SELECT s."warehouseName",
           MIN(s."productName") AS "productName",
           MAX(s."stockLevel") AS "highestStock"
    FROM (
      SELECT w.name AS "warehouseName",
             p.name AS "productName",
             SUM(
               CASE
                 WHEN o.type = 'shipment' THEN oi.quantity
                 WHEN o.type = 'delivery' THEN -oi.quantity
                 ELSE NULL
               END
             ) AS "stockLevel"
      FROM "orders" o
      JOIN "order_items" oi ON o.id = oi."orderId"
      JOIN "products" p ON p.id = oi."productId"
      JOIN "warehouses" w ON o."warehouseId" = w.id
      WHERE o."deletedAt" IS NULL
        AND oi."deletedAt" IS NULL
        AND p."deletedAt" IS NULL
      GROUP BY w.name, p.name
    ) s
    GROUP BY s."warehouseName"
    ORDER BY MAX(s."stockLevel") DESC
    LIMIT 2
    `,
            {type: QueryTypes.SELECT},
        );

        return results;
    }
}

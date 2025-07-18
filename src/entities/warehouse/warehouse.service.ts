import Warehouse, { WarehouseProperties } from './warehouse.model.js';

export class WarehouseService {
    constructor(private readonly model = Warehouse) {}

    async getAll(): Promise<Warehouse[]> {
        return await this.model.findAll();
    }

    async getById(id: string): Promise<Warehouse | null> {
        return await this.model.findByPk(id);
    }

    async create(
        warehouseData: WarehouseProperties,
    ): Promise<Warehouse | null> {
        return await this.model.create(warehouseData);
    }

    async update(
        warehouseId: string,
        warehouseData: WarehouseProperties,
    ): Promise<Warehouse> {
        const [count] = await this.model.update(warehouseData, {
            where: {id: warehouseId},
        });
        if (count === 0) {
            throw new Error(`Warehouse with id ${warehouseId} not found`);
        }
        const updated = await this.model.findByPk(warehouseId);
        if (!updated) {
            throw new Error(`Warehouse fetch failed after update`);
        }
        return updated;
    }

    async delete(warehouseId: string): Promise<void> {
        const warehouse = await this.model.findByPk(warehouseId);
        if (!warehouse) {
            throw new Error(`Warehouse with ID ${warehouseId} does not exist`);
        }

        await warehouse.destroy();
    }
}

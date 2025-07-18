import OrderItem, { OrderItemProperties } from './orderItem.model.js';

export class OrderItemService {
    constructor(private readonly model = OrderItem) {}

    async getAll(): Promise<OrderItem[]> {
        return await this.model.findAll();
    }

    async getById(id: string): Promise<OrderItem | null> {
        return await this.model.findByPk(id);
    }

    async create(
        orderItemData: OrderItemProperties,
    ): Promise<OrderItem | null> {
        return await this.model.create(orderItemData);
    }

    async update(
        orderItemId: string,
        orderItemData: OrderItemProperties,
    ): Promise<OrderItem> {
        const [count] = await this.model.update(orderItemData, {
            where: {id: orderItemId},
        });
        if (count === 0) {
            throw new Error(`OrderItem with id ${orderItemId} not found!`);
        }
        const updated = await this.model.findByPk(orderItemId);
        if (!updated) {
            throw new Error(`OrderItem fetch failed after update!`);
        }
        return updated;
    }

    async delete(orderItemId: string): Promise<void> {
        const orderItem = await this.model.findByPk(orderItemId);
        if (!orderItem) {
            throw new Error(`OrderItem with ID ${orderItemId} does not exist!`);
        }

        await orderItem.destroy();
    }
}

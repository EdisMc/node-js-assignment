import Order, { OrderProperties } from './order.model.js';

export class OrderService {
    constructor(private readonly model = Order) {}

    async getAll(): Promise<Order[]> {
        return await this.model.findAll();
    }

    async getById(id: string): Promise<Order | null> {
        return await this.model.findByPk(id);
    }

    async create(orderData: OrderProperties): Promise<Order | null> {
        return await this.model.create(orderData);
    }

    async update(orderId: string, orderData: OrderProperties): Promise<Order> {
        const [count] = await this.model.update(orderData, {
            where: {id: orderId},
        });
        if (count === 0) {
            throw new Error(`Order with id ${orderId} not found`);
        }
        const updated = await this.model.findByPk(orderId);
        if (!updated) {
            throw new Error(`Order fetch failed after update`);
        }
        return updated;
    }

    async delete(orderId: string): Promise<void> {
        const order = await this.model.findByPk(orderId);
        if (!order) {
            throw new Error(`Order with ID ${orderId} does not exist`);
        }

        await order.destroy();
    }
}

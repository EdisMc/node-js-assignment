import Invoice, { InvoiceProperties } from './invoice.model.js';

export class InvoiceService {
    constructor(private readonly model = Invoice) {}

    async getAll(): Promise<Invoice[]> {
        return await this.model.findAll();
    }

    async getById(id: string): Promise<Invoice | null> {
        return await this.model.findByPk(id);
    }

    async create(invoiceData: InvoiceProperties): Promise<Invoice | null> {
        return await this.model.create(invoiceData);
    }

    async update(
        invoiceId: string,
        invoiceData: InvoiceProperties,
    ): Promise<Invoice> {
        const [count] = await this.model.update(invoiceData, {
            where: {id: invoiceId},
        });
        if (count === 0) {
            throw new Error(`Invoice with id ${invoiceId} not found`);
        }
        const updated = await this.model.findByPk(invoiceId);
        if (!updated) {
            throw new Error(`Invoice fetch failed after update`);
        }
        return updated;
    }

    async delete(invoiceId: string): Promise<void> {
        const invoice = await this.model.findByPk(invoiceId);
        if (!invoice) {
            throw new Error(`Invoice with ID ${invoiceId} does not exist`);
        }

        await invoice.destroy();
    }
}

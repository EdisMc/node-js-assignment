/* eslint-disable */

const {v4: uuidv4} = require('uuid');

module.exports = {
    async up(queryInterface, _Sequelize) {
        const now = new Date();

        const [companiesCount] = await queryInterface.sequelize.query(
            'SELECT COUNT(*) as count FROM companies',
        );

        if (companiesCount[0].count > 0) {
            console.log('Seed data already exists. Skipping...');
            return;
        }

        const companyIds = {
            techCorp: uuidv4(),
            globalSupplies: uuidv4(),
            retailChain: uuidv4(),
        };

        const userIds = {
            admin1: uuidv4(),
            admin2: uuidv4(),
            manager1: uuidv4(),
            manager2: uuidv4(),
        };

        await queryInterface.sequelize.query(
            'SET session_replication_role = replica;',
        );

        await queryInterface.bulkInsert('companies', [
            {
                id: companyIds.techCorp,
                name: 'TechCorp Ltd',
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: companyIds.globalSupplies,
                name: 'Global Supplies Inc',
                modifiedBy: userIds.admin2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: companyIds.retailChain,
                name: 'Retail Chain Co',
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
        ]);

        await queryInterface.bulkInsert('users', [
            {
                id: userIds.admin1,
                email: 'admin1@techcorp.com',
                password:
                    '$2b$10$N9qo8uLOickgx2ZMRZoMye.IQ7kQI6eW7U8ZSEqEVlLFrJYWNOkI2',
                companyId: companyIds.techCorp,
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: userIds.admin2,
                email: 'admin2@globalsupplies.com',
                password:
                    '$2b$10$N9qo8uLOickgx2ZMRZoMye.IQ7kQI6eW7U8ZSEqEVlLFrJYWNOkI2',
                companyId: companyIds.globalSupplies,
                modifiedBy: userIds.admin2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: userIds.manager1,
                email: 'manager1@techcorp.com',
                password:
                    '$2b$10$N9qo8uLOickgx2ZMRZoMye.IQ7kQI6eW7U8ZSEqEVlLFrJYWNOkI2',
                companyId: companyIds.techCorp,
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: userIds.manager2,
                email: 'manager2@retailchain.com',
                password:
                    '$2b$10$N9qo8uLOickgx2ZMRZoMye.IQ7kQI6eW7U8ZSEqEVlLFrJYWNOkI2',
                companyId: companyIds.retailChain,
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
        ]);

        await queryInterface.sequelize.query(
            'SET session_replication_role = DEFAULT;',
        );

        const warehouseIds = {
            main: uuidv4(),
            secondary: uuidv4(),
            liquid: uuidv4(),
        };

        await queryInterface.bulkInsert('warehouses', [
            {
                id: warehouseIds.main,
                name: 'Main Warehouse',
                location: 'Sofia, Bulgaria',
                supportType: 'solid',
                companyId: companyIds.techCorp,
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: warehouseIds.secondary,
                name: 'Secondary Storage',
                location: 'Plovdiv, Bulgaria',
                supportType: 'solid',
                companyId: companyIds.globalSupplies,
                modifiedBy: userIds.admin2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: warehouseIds.liquid,
                name: 'Liquid Storage Facility',
                location: 'Varna, Bulgaria',
                supportType: 'liquid',
                companyId: companyIds.retailChain,
                modifiedBy: userIds.manager2,
                createdAt: now,
                updatedAt: now,
            },
        ]);

        const productIds = {
            laptop: uuidv4(),
            mouse: uuidv4(),
            keyboard: uuidv4(),
            phone: uuidv4(),
            oil: uuidv4(),
            water: uuidv4(),
            juice: uuidv4(),
        };

        await queryInterface.bulkInsert('products', [
            {
                id: productIds.laptop,
                name: 'Gaming Laptop',
                prodType: 'solid',
                price: 1299.99,
                companyId: companyIds.techCorp,
                warehouseId: warehouseIds.main,
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: productIds.mouse,
                name: 'Wireless Mouse',
                prodType: 'solid',
                price: 29.99,
                companyId: companyIds.techCorp,
                warehouseId: warehouseIds.main,
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: productIds.keyboard,
                name: 'Mechanical Keyboard',
                prodType: 'solid',
                price: 89.99,
                companyId: companyIds.globalSupplies,
                warehouseId: warehouseIds.secondary,
                modifiedBy: userIds.admin2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: productIds.phone,
                name: 'Smartphone',
                prodType: 'solid',
                price: 699.99,
                companyId: companyIds.globalSupplies,
                warehouseId: warehouseIds.secondary,
                modifiedBy: userIds.admin2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: productIds.oil,
                name: 'Cooking Oil',
                prodType: 'liquid',
                price: 4.99,
                companyId: companyIds.retailChain,
                warehouseId: warehouseIds.liquid,
                modifiedBy: userIds.manager2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: productIds.water,
                name: 'Mineral Water',
                prodType: 'liquid',
                price: 1.99,
                companyId: companyIds.retailChain,
                warehouseId: warehouseIds.liquid,
                modifiedBy: userIds.manager2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: productIds.juice,
                name: 'Orange Juice',
                prodType: 'liquid',
                price: 3.49,
                companyId: companyIds.retailChain,
                warehouseId: warehouseIds.liquid,
                modifiedBy: userIds.manager2,
                createdAt: now,
                updatedAt: now,
            },
        ]);

        const partnerIds = {
            supplier1: uuidv4(),
            supplier2: uuidv4(),
            customer1: uuidv4(),
            customer2: uuidv4(),
            customer3: uuidv4(),
        };

        await queryInterface.bulkInsert('partners', [
            {
                id: partnerIds.supplier1,
                name: 'Tech Supplier Ltd',
                type: 'supplier',
                companyId: companyIds.techCorp,
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: partnerIds.supplier2,
                name: 'Global Parts Inc',
                type: 'supplier',
                companyId: companyIds.globalSupplies,
                modifiedBy: userIds.admin2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: partnerIds.customer1,
                name: 'Retail Store Chain',
                type: 'customer',
                companyId: companyIds.techCorp,
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: partnerIds.customer2,
                name: 'Electronics Mall',
                type: 'customer',
                companyId: companyIds.globalSupplies,
                modifiedBy: userIds.admin2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: partnerIds.customer3,
                name: 'Supermarket Network',
                type: 'customer',
                companyId: companyIds.retailChain,
                modifiedBy: userIds.manager2,
                createdAt: now,
                updatedAt: now,
            },
        ]);

        const orderIds = {
            order1: uuidv4(),
            order2: uuidv4(),
            order3: uuidv4(),
            order4: uuidv4(),
            order5: uuidv4(),
        };

        await queryInterface.bulkInsert('orders', [
            {
                id: orderIds.order1,
                warehouseId: warehouseIds.main,
                partnerId: partnerIds.customer1,
                companyId: companyIds.techCorp,
                date: new Date('2024-01-15'),
                type: 'delivery',
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: orderIds.order2,
                warehouseId: warehouseIds.secondary,
                partnerId: partnerIds.customer2,
                companyId: companyIds.globalSupplies,
                date: new Date('2024-01-20'),
                type: 'shipment',
                modifiedBy: userIds.admin2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: orderIds.order3,
                warehouseId: warehouseIds.liquid,
                partnerId: partnerIds.customer3,
                companyId: companyIds.retailChain,
                date: new Date('2024-01-25'),
                type: 'delivery',
                modifiedBy: userIds.manager2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: orderIds.order4,
                warehouseId: warehouseIds.main,
                partnerId: partnerIds.customer1,
                companyId: companyIds.techCorp,
                date: new Date('2024-02-01'),
                type: 'shipment',
                modifiedBy: userIds.manager1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: orderIds.order5,
                warehouseId: warehouseIds.secondary,
                partnerId: partnerIds.customer2,
                companyId: companyIds.globalSupplies,
                date: new Date('2024-02-05'),
                type: 'delivery',
                modifiedBy: userIds.admin2,
                createdAt: now,
                updatedAt: now,
            },
        ]);

        const orderItemIds = {
            item1: uuidv4(),
            item2: uuidv4(),
            item3: uuidv4(),
            item4: uuidv4(),
            item5: uuidv4(),
            item6: uuidv4(),
            item7: uuidv4(),
            item8: uuidv4(),
            item9: uuidv4(),
            item10: uuidv4(),
        };

        await queryInterface.bulkInsert('order_items', [
            {
                id: orderItemIds.item1,
                quantity: 1,
                productId: productIds.laptop,
                orderId: orderIds.order1,
                modifiedBy: userIds.admin1,
                updatedAt: now,
            },
            {
                id: orderItemIds.item2,
                quantity: 2,
                productId: productIds.mouse,
                orderId: orderIds.order1,
                modifiedBy: userIds.admin1,
                updatedAt: now,
            },
            {
                id: orderItemIds.item3,
                quantity: 1,
                productId: productIds.keyboard,
                orderId: orderIds.order1,
                modifiedBy: userIds.admin1,
                updatedAt: now,
            },
            {
                id: orderItemIds.item4,
                quantity: 1,
                productId: productIds.phone,
                orderId: orderIds.order2,
                modifiedBy: userIds.admin2,
                updatedAt: now,
            },
            {
                id: orderItemIds.item5,
                quantity: 1,
                productId: productIds.keyboard,
                orderId: orderIds.order2,
                modifiedBy: userIds.admin2,
                updatedAt: now,
            },
            {
                id: orderItemIds.item6,
                quantity: 2,
                productId: productIds.water,
                orderId: orderIds.order3,
                modifiedBy: userIds.manager2,
                updatedAt: now,
            },
            {
                id: orderItemIds.item7,
                quantity: 1,
                productId: productIds.juice,
                orderId: orderIds.order3,
                modifiedBy: userIds.manager2,
                updatedAt: now,
            },
            {
                id: orderItemIds.item8,
                quantity: 1,
                productId: productIds.oil,
                orderId: orderIds.order3,
                modifiedBy: userIds.manager2,
                updatedAt: now,
            },
            {
                id: orderItemIds.item9,
                quantity: 2,
                productId: productIds.mouse,
                orderId: orderIds.order4,
                modifiedBy: userIds.manager1,
                updatedAt: now,
            },
            {
                id: orderItemIds.item10,
                quantity: 2,
                productId: productIds.phone,
                orderId: orderIds.order5,
                modifiedBy: userIds.admin2,
                updatedAt: now,
            },
        ]);

        const invoiceIds = {
            invoice1: uuidv4(),
            invoice2: uuidv4(),
            invoice3: uuidv4(),
            invoice4: uuidv4(),
            invoice5: uuidv4(),
        };

        await queryInterface.bulkInsert('invoices', [
            {
                id: invoiceIds.invoice1,
                issueDate: new Date('2024-01-16'),
                orderId: orderIds.order1,
                modifiedBy: userIds.admin1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: invoiceIds.invoice2,
                issueDate: new Date('2024-01-21'),
                orderId: orderIds.order2,
                modifiedBy: userIds.admin2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: invoiceIds.invoice3,
                issueDate: new Date('2024-01-26'),
                orderId: orderIds.order3,
                modifiedBy: userIds.manager2,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: invoiceIds.invoice4,
                issueDate: new Date('2024-02-02'),
                orderId: orderIds.order4,
                modifiedBy: userIds.manager1,
                createdAt: now,
                updatedAt: now,
            },
            {
                id: invoiceIds.invoice5,
                issueDate: new Date('2024-02-06'),
                orderId: orderIds.order5,
                modifiedBy: userIds.admin2,
                createdAt: now,
                updatedAt: now,
            },
        ]);

        console.log('Demo data seeded successfully!');
        console.log('Generated UUIDs:');
        console.log('Companies:', companyIds);
        console.log('Users:', userIds);
        console.log('Warehouses:', warehouseIds);
        console.log('Products:', productIds);
        console.log('Partners:', partnerIds);
        console.log('Orders:', orderIds);
        console.log('OrderItems:', orderItemIds);
        console.log('Invoices:', invoiceIds);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('invoices', null, {});
        await queryInterface.bulkDelete('order_items', null, {});
        await queryInterface.bulkDelete('orders', null, {});
        await queryInterface.bulkDelete('partners', null, {});
        await queryInterface.bulkDelete('products', null, {});
        await queryInterface.bulkDelete('warehouses', null, {});
        await queryInterface.bulkDelete('users', null, {});
        await queryInterface.bulkDelete('companies', null, {});

        console.log('Demo data removed!');
    },
};

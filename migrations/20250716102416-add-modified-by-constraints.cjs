/* eslint-disable */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, _Sequelize) {
        await queryInterface.addConstraint('companies', {
            fields: ['modifiedBy'],
            type: 'foreign key',
            name: 'fk_companies_modifiedBy',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        await queryInterface.addConstraint('users', {
            fields: ['modifiedBy'],
            type: 'foreign key',
            name: 'fk_users_modifiedBy',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        await queryInterface.addConstraint('warehouses', {
            fields: ['modifiedBy'],
            type: 'foreign key',
            name: 'fk_warehouses_modifiedBy',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        await queryInterface.addConstraint('products', {
            fields: ['modifiedBy'],
            type: 'foreign key',
            name: 'fk_products_modifiedBy',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        await queryInterface.addConstraint('partners', {
            fields: ['modifiedBy'],
            type: 'foreign key',
            name: 'fk_partners_modifiedBy',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        await queryInterface.addConstraint('orders', {
            fields: ['modifiedBy'],
            type: 'foreign key',
            name: 'fk_orders_modifiedBy',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        await queryInterface.addConstraint('order_items', {
            fields: ['modifiedBy'],
            type: 'foreign key',
            name: 'fk_order_items_modifiedBy',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        await queryInterface.addConstraint('invoices', {
            fields: ['modifiedBy'],
            type: 'foreign key',
            name: 'fk_invoices_modifiedBy',
            references: {
                table: 'users',
                field: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
    },

    async down(queryInterface, _Sequelize) {
        await queryInterface.removeConstraint(
            'invoices',
            'fk_invoices_modifiedBy',
        );
        await queryInterface.removeConstraint(
            'order_items',
            'fk_order_items_modifiedBy',
        );
        await queryInterface.removeConstraint('orders', 'fk_orders_modifiedBy');
        await queryInterface.removeConstraint(
            'partners',
            'fk_partners_modifiedBy',
        );
        await queryInterface.removeConstraint(
            'products',
            'fk_products_modifiedBy',
        );
        await queryInterface.removeConstraint(
            'warehouses',
            'fk_warehouses_modifiedBy',
        );
        await queryInterface.removeConstraint('users', 'fk_users_modifiedBy');
        await queryInterface.removeConstraint(
            'companies',
            'fk_companies_modifiedBy',
        );
    },
};

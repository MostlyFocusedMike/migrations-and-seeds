// Belongs to table
exports.up = (knex) => {
    return knex.schema.createTable('articles', (table) => {
        table.increments().primary();
        table.string('title').notNullable();
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('articles');
};

// Basic table
exports.up = (knex) => {
    return knex.schema.createTable('tags', (table) => {
        table.increments().primary();
        table.string('name').notNullable(); // name of the tag for presentation
        table.string('slug').notNullable(); // lowercase, no punctuation, no spaces
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('tags');
};

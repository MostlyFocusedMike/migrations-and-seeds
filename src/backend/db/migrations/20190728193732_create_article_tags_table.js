const addUpdatedAndCreatedAt = require('./mixins/updated');
// Many to many table
exports.up = (knex) => {
    return knex.schema.createTable('article_tags', (table) => {
        table.increments().primary();
        table.integer('article_id').unsigned().notNullable();
        table.foreign('article_id').references('id').inTable('articles').onDelete('CASCADE'); // cascade deletes this join when the foreign row is deleted
        table.integer('tag_id').unsigned().notNullable();
        table.foreign('tag_id').references('id').inTable('tags').onDelete('CASCADE');
        addUpdatedAndCreatedAt(knex, table);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('article_tags');
};

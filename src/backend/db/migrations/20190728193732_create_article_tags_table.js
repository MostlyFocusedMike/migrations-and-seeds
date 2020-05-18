const addStandardFields = require('./mixins/addStandardFields');
// Many to many table
exports.up = (knex) => {
    return knex.schema.createTable('article_tags', (table) => {
        table.integer('article_id').unsigned().notNullable();
        table.foreign('article_id').references('id').inTable('articles').onDelete('CASCADE'); // cascade deletes this join when the foreign row is deleted BE CAREFUL WITH THESE
        table.integer('tag_id').unsigned().notNullable();
        table.foreign('tag_id').references('id').inTable('tags').onDelete('CASCADE');
        addStandardFields(knex, table);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('article_tags');
};

// mixins should be unbelievably simple and never really edited
// because you want the migration history to be obvious and repeatable
const addStandardFields = (knex, table) => {
    table.increments().primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
}

module.exports = addStandardFields;

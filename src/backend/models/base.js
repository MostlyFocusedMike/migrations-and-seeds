const { Model } = require('objection');
const knex = require('./knex');

Model.knex(knex); // Give the knex object to objection.

class Base extends Model {
    static get useLimitInFirst() { // check docs
        return true;
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }

    static async all() {
        return this.query();
    }

    static async find(id) {
        return this.query().findById(id);
    }

    static async findBy(fieldName, value) {
        return this.query().where(fieldName, '=', value).first();
    }

    static async findAllBy(fieldName, value) {
        return this.query().where(fieldName, '=', value);
    }

    static async createWithRelations(itemToCreate) { // returns a single object created
        if (Array.isArray(itemToCreate)) throw new Error('Please use createManyWithRelations')
        return this.query().insertGraph(itemToCreate).returning('*');
    }

    static async createManyWithRelations(itemsToCreate) { // returns an array of all objects created
        if (!Array.isArray(itemsToCreate)) throw new Error('Please use createWithRelations')
        return this.query().insertGraph(itemsToCreate).returning('*');
    }

    static async create(itemToCreate) { // create with no relations, returns object created
        return await this.query().insert(itemToCreate).returning('*'); // you can do this if you're using postrgres, check docs
    }

    static async delete(id) {
        return this.query().deleteById(id)
    }

    static async deleteWhere(column, value, operator = '=') {
        return await this.query().delete().where(column, operator, value);
    }

    static async update(itemId, updateProperties) {
        return this.query().findById(itemId).patch(updateProperties);
    }


    // the following methods are for the actual instances of the model
    async delete() {
        return this.$query().deleteById(this.id)
    }

    async update(updateProperties) {
        return await this.$query().patch(updateProperties);
    }

    async addRelations(relationName, relationObjOrObjs) {
        return this.$relatedQuery(relationName).relate(relationObjOrObjs.id);
    }

    async relations(relationName) {
        return this.$relatedQuery(relationName);
    }
}

module.exports = Base;

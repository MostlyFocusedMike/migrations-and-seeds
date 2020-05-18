const { pool, query } = require('./pg-connection');

const User = {
    all: async () => {
        const queryText = 'SELECT * FROM users';
        const data = await query(queryText);
        return data.rows;
    },

    find: async (id) => {
        const queryText = 'SELECT * FROM users where id = $1';
        const data = await query(queryText, [id]);
        return data.rows[0];
    },

    findByName: async (value) => {  // SURE WISH THIS WAS DYNAMIC
        const queryText = `SELECT * FROM users where name = $1`;
        const data = await query(queryText, [value]);
        return data.rows;
    }

    // static async findAllBy(fieldName, value) {
    //     return this.query().where(fieldName, '=', value);
    // }

    // // obj or array
    // static async create(itemOrItemsToCreate) {
    //     return this.query().insertGraph(itemOrItemsToCreate);
    // }

    // async addRelations(relationName, relationObjOrObjs) {
    //     return this.$relatedQuery(relationName).relate(relationObjOrObjs.id);
    // }

    // async relations(relationName) {
    //     return this.$relatedQuery(relationName);
    // }
}

// User.all().then(console.log)
// User.find(1).then(console.log)
// User.findByName('name', 'tom').then(console.log)
// pool.end();
module.exports = User;

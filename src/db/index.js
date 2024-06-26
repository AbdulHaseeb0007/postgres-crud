const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const { accounts } = require('./schema.js');

let instance;

class POSTGRES {
    #connection = new Pool({
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        user: process.env.PGUSER,
        password: process.env.DB_PASSWORD,
        database: process.env.PGDATABASE,
    });

    #db = null;

    getConnection() {
        return this.#db;
    }

    constructor() {
        if (instance) throw new Error('You can only create one instance!');
        this.#db = drizzle(this.#connection, { schema: { accounts }, mode: 'default' });
        instance = this;
    }
}

const db = Object.freeze(new POSTGRES());
module.exports = db;

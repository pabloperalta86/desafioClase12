const knexLib = require("knex");

class ContenedorSql {
    constructor(config) {
        this.knex = knexLib(config)
    }
    
    crearTabla() {
        return this.knex.schema.createTableIfNotExists('productos', table => {
            table.increments('id').primary();
            table.string('title', 50).notNullable();
            table.string('thumbnail', 100).notNullable();
            table.float('price');
        })
    }

    crearTablaMessage() {
        return this.knex.schema.createTableIfNotExists('mensajes', table => {
            table.increments('id').primary();
            table.string('date', 100).notNullable();
            table.string('email', 100).notNullable();
            table.string('message').notNullable();
        })
    }

    save(producto) {
        console.log("Se guardó el producto en la base de datos SQL Ecommerce")
        return this.knex('productos').insert(producto);
    }

    saveMessage(mensaje) {
        console.log("Se guardó el mensaje en la base de datos SQLite3 Ecommerce")
        return this.knex('mensajes').insert(mensaje);
    }

    getAllProducts() {
        return this.knex('productos').select('*');
    }

    getAllMessages() {
        return this.knex('mensajes').select('*');
    }

    getProductById(id) {
        return this.knex('productos').where('id', id).select();
    }

    getMessageById(id) {
        return this.knex('mensajes').where('id', id).select();
    }

    deleteProductById(id) {
        return this.knex('productos').where('id', id).del();
    }

    deleteAllProducts() {
        return this.knex('productos').del();
    }

    close() {
        this.knex.destroy();
    }

}

module.exports = ContenedorSql;
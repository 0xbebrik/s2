const {Sequelize} = require('sequelize');

module.exports = new Sequelize(

    "Sova_test",
    "postgres",
    "fafas",
    {
        // logging: false,
        host: "localhost",
        dialect: 'postgres',
        port: 5432
    }
)
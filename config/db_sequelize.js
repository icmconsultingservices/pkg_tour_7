//db_sequelize.js
//Create an SQLite connection
//Connect to SQLite database
const path = require('path');
/////
//const { Sequelize } = require('sequelize');
const Sequelize = require('sequelize');


//Crear base de datos
// Passing parameters separately (sqlite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(
        // Utilizando en path join los puntos .. segundos
        // se logra que el folder data sea direccionado
        // desde el folder pkg_tour, de esa manera el
        // folder data esta bajo el folder pkg_tour
        // SEE: https://stackoverflow.com/questions/30845416/how-to-go-back-1-folder-level-with-dirname
        __dirname, '..', 'data', 'tour.sequalize-sqlite-db'),
    define: {
        // Enforcing the table name to be equal to the model name
        // You can stop the auto-pluralization performed by Sequelize using the
        // freezeTableName: true option. This way, Sequelize will infer the table name to
        // be equal to the model name, without any modifications:
        freezeTableName: true
    },
    
    // Disables logging
    // SEE: https://sequelize.org/docs/v7/getting-started/#logging
    logging: false

});
// crea la base de datos sin embargo no es desplegada en el folder /data

console.log(Date()+" sequelize created the database");
console.log(Date()+" "+path.join(__dirname, 'data', 'tour.sqlite'));

// Export the Sequelize instance
module.exports = sequelize;


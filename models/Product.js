//Producto.js
//Include Sequelize module. 
//const Sequelize = require('sequelize');
//Sequelize no esta siendo utilizado en la definicion de Product
const Datatypes = require('sequelize');
//en varios documentos se utiliza Datatypes entre llaves
//const { Datatypes } = require('sequelize');
//no se ha encontrado l razon de utilizar llaves, y cuando
//se utilizan las llaves el require no funciona.
//esta duda queda pendiente. Al momento trabaja el
//require sin necesidad de utilizar Datatypes entre llaves
//y no se conoze aun el porque es necesario utilizar llaves
const path = require("path");


// Import sequelize object, 
// Database connection pool managed by Sequelize. 
///Import db_sequelize
//const db_sequelize = require('./db_sequelize.js');
//const db_sequelize = require('./config/db_sequelize.js');
const db_sequelize = require(path.join(__dirname,'..','config','db_sequelize.js'));


// Define method takes two arguments 
// 1st - name of table 
// 2nd - columns inside the table 
const Product = db_sequelize.define('Product', { 

    id: { 

		// Sequelize module has INTEGER Data_Type. 
		type:Datatypes.INTEGER, 

		// To increment user_id automatically. 
		autoIncrement:true, 

		// user_id can not be null. 
		allowNull:false, 

		// For uniquely identify user. 
		primaryKey:true
	}, 
    image: { type: Datatypes.STRING },
    title: { type: Datatypes.STRING, allowNull: false },
    price: { type: Datatypes.INTEGER },
    description: { type: Datatypes.TEXT },
    published: { type: Datatypes.BOOLEAN },
    
    // Column-4, default values for 
	// dates => current time 
	myDate: { 
        type: Datatypes.DATE, 
        defaultValue: Datatypes.NOW,
        allowNull: true
    }, 

	// Timestamps 
	createdAt: {
        type: Datatypes.DATE,
        allowNull: true
    },
	updatedAt: {
        type: Datatypes.DATE,
        allowNull: true
    }
});

// Exporting Product, using this constant 
// we can perform CRUD operations on 
// 'Product' table. 
console.log(Date() + " " + "Model Product has been defined");
module.exports = Product;

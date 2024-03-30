//Address.js
// Include Sequelize module. 
const Sequelize = require('sequelize');
const Datatypes = require('sequelize');
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
const Address = db_sequelize.define('Address', { 

	address_id:{ 

		// Sequelize module has INTEGER Data_Type. 
		type:Datatypes.INTEGER, 

		// To increment user_id automatically. 
		autoIncrement:true, 

		// user_id can not be null. 
		allowNull:false, 

		// For uniquely identify user. 
		primaryKey:true
	}, 

	address: { type: Datatypes.STRING, allowNull:true }, 

	postal_code: { type: Datatypes.STRING, allowNull:true }, 

    district: { type: Datatypes.STRING, allowNull:true},
    
    // Column-4, default values for 
	// dates => current time 
	myDate: { type: Datatypes.DATE, 
			defaultValue: Datatypes.NOW }, 

	// Timestamps 
	createdAt: Datatypes.DATE, 
	updatedAt: Datatypes.DATE, 
});

//const Customer = require('./Customer.js');
const Customer = require(path.join(__dirname,'..','models', 'Customer.js'));


// Option 2
// Relacion 1:1 
// Cada Customer tiene una Direccion
Customer.hasOne(Address, {
    foreignKey: {
        name: 'address_id'
    }
});
Address.belongsTo(Customer, {
    foreignKey: 'address_id'
});

// Exporting Address, using this constant 
// we can perform CRUD operations on 
// 'Address' table. 
console.log(Date() + " " + "Model Address has been defined");
module.exports = Address;

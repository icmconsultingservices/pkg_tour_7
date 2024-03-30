//Book.js
// Include Sequelize module. 
const Sequelize = require('sequelize'); 
const path = require("path");

// Import sequelize object, 
// Database connection pool managed by Sequelize. 
///Import db_sequelize
//const db_sequelize = require('./db_sequelize.js');
//const db_sequelize = require('./config/db_sequelize.js');
//const db_sequelize = require(path.join(__dirname,'../config/db_sequelize.js'));
const db_sequelize = require(path.join(__dirname,'..','config','db_sequelize.js'));

// Define method takes two arguments 
// 1st - name of table 
// 2nd - columns inside the table 
const Book = db_sequelize.define('Book', { 

	// Column-1, user_id is an object with 
	// properties like type, keys, 
	// validation of column. 
	Book_id:{ 

		// Sequelize module has INTEGER Data_Type. 
		type:Sequelize.INTEGER, 

		// To increment user_id automatically. 
		autoIncrement:true, 

		// user_id can not be null. 
		allowNull:false, 

		// For uniquely identify user. 
		primaryKey:true
	}, 

	// Column-2, name 
	Title: { type: Sequelize.STRING, allowNull:true }, 

	// Column-3, email 
	Author: { type: Sequelize.STRING, allowNull:true }, 

    // Column, Comments
    Comments: { type: Sequelize.STRING, allowNull:true},
    
    // Column-4, default values for 
	// dates => current time 
	myDate: { type: Sequelize.DATE, 
			defaultValue: Sequelize.NOW }, 

	// Timestamps 
	createdAt: Sequelize.DATE, 
	updatedAt: Sequelize.DATE, 
}) 

// Exporting Book, using this constant 
// we can perform CRUD operations on 
// 'Book' table. 
console.log(Date() + " " + "Model Book has been defined");
module.exports = Book;

//Review.js
// Include Sequelize module. 
const Sequelize = require('sequelize');
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
const Review = db_sequelize.define('Review', { 

	id:{ 

		// Sequelize module has INTEGER Data_Type. 
		type:Sequelize.INTEGER, 

		// To increment user_id automatically. 
		autoIncrement:true, 

		// user_id can not be null. 
		allowNull:false, 

		// For uniquely identify user. 
		primaryKey:true
	}, 

    rating: { type: Sequelize.INTEGER, allowNull:true },
    evaluation: { type: Sequelize.TEXT, allowNull:true },
    
	// dates => current time 
	myDate: { type: Sequelize.DATE, 
			defaultValue: Sequelize.NOW }, 

	// Timestamps 
	createdAt: Sequelize.DATE, 
	updatedAt: Sequelize.DATE, 
}); 

// Exporting Customer, using this constant 
// we can perform CRUD operations on 
// 'Customer' table. 
console.log(Date() + " " + "Model Review has been defined");
module.exports = Review;

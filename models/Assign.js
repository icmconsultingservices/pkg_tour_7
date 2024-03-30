// Assign.js
// Include Sequelize module. 
const Sequelize = require('sequelize'); 
const path = require("path");

// Import sequelize object, 
// Database connection pool managed by Sequelize. 
// Import db_sequelize
const db_sequelize = require(path.join(__dirname,'..','config','db_sequelize.js'));

const Assign = db_sequelize.define('Assign', { 

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
    Book_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Book",
          key: "Book_id",
        },
    },
    User_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "user_id",
        },
      },
     returnStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defalutValue: false,
      },
    
	// dates => current time 
	myDate: { type: Sequelize.DATE, 
			defaultValue: Sequelize.NOW }, 

	// Timestamps 
	createdAt: Sequelize.DATE, 
	updatedAt: Sequelize.DATE, 
});

// Exporting using this constant 
// we can perform CRUD operations
console.log(Date() + " " + "Model Assign has been defined");
module.exports = Assign;

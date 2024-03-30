// listar_customers.js

// Set router
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", async (req, res) => {    
        
    //Get the model for Customer
    const Customer = require(path.join(__dirname,'..', 'models', 'Customer.js'));
    // Get the model for Address
    const Address = require(path.join(__dirname,'..', 'models', 'Address.js'));

    // connect to db
    const db_sequelize = require(path.join(__dirname, '..','config', 'db_sequelize.js'));
    
    // Inner Join
    const [customers, metadata] = await db_sequelize.query(
        "SELECT C.id, C.first_name, C.last_name, A.address FROM Customer C INNER JOIN Address A ON C.AddressId=A.id");
    // using sequelize raw query, to link Customer with Address is not really using ORM Sequelize, how ever raw query using sequelize works
        
    // Display Customer metadata using the view 
    // provided by the template .ejs
    res.render("view_listar_customers.ejs", { model: customers });
        
});

module.exports = router;

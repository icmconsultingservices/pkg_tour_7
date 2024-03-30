// listar_customers.js

// Set router
const express = require("express");
const router = express.Router();
const path = require("path");

// Import db no es requerido
// db_sequelize ya da el acceso mediante los
// modelos de las tablas. Unicamente es necesario
// utilizar la referencia al nombre del modelo
// por ejemplo Customer, asi que no es necesario incluir
// const db_sequelize = require("../db_sequelize);

router.get("/", async (req, res) => {    
        
    //Get the model for Customer
    const Customer = require(path.join(__dirname,'..', 'models', 'Customer.js'));
    const Address = require(path.join(__dirname,'..', 'models', 'Address.js'));

    
    const db_sequelize = require(path.join(__dirname, '..','config', 'db_sequelize.js'));
    
    // Inner Join
    const [customers, metadata] = await db_sequelize.query(
        "SELECT C.id, C.first_name, C.last_name, A.address FROM Customer C INNER JOIN Address A ON C.AddressId=A.id");
    // using sequelize raw query, to link Customer with Address is not really using ORM Sequelize
    
    // Inner Join using ORM Sequelize
    Customer.findAll({
        include: [{
            model:Address,
            required:true
        }]
    }).then(customers => {
        // customers found
        console.log(customers);
        console.log("Bingo. Customers found");
    });

    
    // Luego preparar el template para visualizar productos
    res.render("view_listar_customers.ejs", { model: customers });
    
    
});

module.exports = router;

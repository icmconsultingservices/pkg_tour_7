// listar_productos.js

// Set router
const express = require("express");
const router = express.Router();
const path = require("path");

// Import db no es requerido
// db_sequelize ya da el acceso mediante los
// modelos de las tablas. Unicamente es necesario
// utilizar la referencia al nombre del modelo
// por ejemplo Product, asi que no es necesario incluir
// const db_sequelize = require("../db_sequelize);

router.get("/", async (req, res) => {    
        
    // Get the model for Product
    const Product = require(path.join(__dirname,'..', 'models', 'Product.js'));
    
    //Get the model for Review
    const Review = require(path.join(__dirname,'..', 'models', 'Review.js'));
    
    // connect to db
    const db_sequelize = require(path.join(__dirname, '..','config', 'db_sequelize.js'));
    
    // Product has 1:m relationship with Review
    // Find all Products with Reviews
    // Inner Join 
    const [products, metadata] = await db_sequelize.query(
        // As the inner join is used, it is imperative to have diferent names per each metadata
        // in the select statement.
        // select t1.Column as Price, t2.Column as Other_Price
        // from table1 as t1 INNER JOIN table2 as t2 
        // ON t1.Key = t2.Key
        // SEE: https://stackoverflow.com/questions/614238/how-to-rename-columns-with-select
        "SELECT P.id AS Product_id, P.image, P.title, P.price, P.description, P.published, R.id as Review_id, R.rating, R.evaluation FROM Product P INNER JOIN Review R ON P.ReviewId=R.id");
        // using sequelize raw query, to link Customer with Address is not really using ORM Sequelize, how ever raw query using sequelize works

    // display products to verify query only for test
    //console.log(products);
    
    // display actual date to track actual date, only for test
    // create a new `Date` object
    //const now = new Date();

    // display actual time to track actual time, only for test
    // get the current date and time as a string
    //const currentDateTime = now.toLocaleString();

    //console.log(currentDateTime); // output: "7/20/2021, 2:28:15 PM" (will vary depending on your time zone)
    
    // Luego preparar el template para visualizar productos
    res.render("view_listar_productos.ejs", { model: products });    
});

module.exports = router;

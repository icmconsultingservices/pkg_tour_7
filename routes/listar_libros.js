// listar_libros.js

// Set router
const express = require("express");
const router = express.Router();
const path = require("path");

// Import db no es requerido
// db_sequelize ya da el acceso mediante los
// modelos de las tablas. Unicamente es necesario
// utilizar la referencia al nombre del modelo
// por ejemplo Book, asi que no es necesario incluir
// const db_sequelize = require("../db_sequelize);

router.get("/", async (req, res) => {    
        
    // Get Book Model
    const Book = require(path.join(__dirname,'..', 'models', 'Book.js'));

    // Find all books
    const libros = await Book.findAll();
    
    // Display books
    res.render("view_listar_libros.ejs", { model: libros });
    
});

module.exports = router;

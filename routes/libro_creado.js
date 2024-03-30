/*
    libro_creado.js
    despliega el el formulario que indica al usuario
    que el libro ha sido creado con exito
    es decir un nuevo registro fue creado 
    en la tabla Book.
*/

// to use express.Router()
const express = require("express");
const router = express.Router();

// make the route available for /libro_creado
router.get("/", (reg, res) => {
    // Desplegar el templete que indica que el libro fue 
    // creado
    res.render("view_libro_creado.ejs");
});

// Export the module About.js
module.exports = router;

/*
    libro_eliminado.js
    despliega el el formulario que indica al usuario
    que el libro ha sido eliminado con exito
    es decir un nuevo registro fue borrado 
    en la tabla Book.
*/

// to use express.Router()
const express = require("express");
const router = express.Router()


// make the route available for /libro_creado
router.get("/", (reg, res) => {
    // Desplegar el templete que indica que el libro fue 
    // eliminado
    res.render("view_libro_eliminado.ejs");
});

// Export the module About.js
module.exports = router;

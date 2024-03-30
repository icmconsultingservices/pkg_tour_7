/*
    libro_editado.js
    despliega el el formulario que indica al usuario
    que el libro ha sido editado con exito
    es decir el registro fue modificado 
    en la tabla Book.
*/

// to use express.Router()
const express = require("express");
const router = express.Router()


// make the route available for /libro_editado
router.get("/", (reg, res) => {
    // Desplegar el templete que indica que el libro fue 
    // editado
    res.render("view_libro_editado.ejs");
});

// Export the module About.js
module.exports = router;

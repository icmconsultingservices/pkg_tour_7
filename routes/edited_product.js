/*
    edited_product.js
    despliega el el formulario que indica al usuario
    que el product ha sido editado con exito
    es decir el registro fue modificado 
    en la tabla Product.
*/

// to use express.Router()
const express = require("express");
const router = express.Router()


// make the route available for /edited_product
router.get("/", (reg, res) => {
    // Desplegar el templete que indica que el producto fue 
    // editado
    res.render("view_edited_product.ejs");
});

// Export the module About.js
module.exports = router;

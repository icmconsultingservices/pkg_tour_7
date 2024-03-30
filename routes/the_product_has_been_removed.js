/*
    the_product_has_been_removed.js
    despliega el el formulario que indica al usuario
    que el producto ha sido eliminado con exito
    es decir un registro fue borrado 
    en la tabla Product.
*/

// to use express.Router()
const express = require("express");
const router = express.Router()


// make the route available for /the_product_has_been_removed
router.get("/", (reg, res) => {
    // Desplegar el templete que indica que el producto fue 
    // eliminado
    res.render("view_product_has_been_removed.ejs");
});

// Export the module About.js
module.exports = router;

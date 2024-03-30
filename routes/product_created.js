/*
    product_created.js
    despliega el el formulario que indica al usuario
    que el producto ha sido creado con exito
    es decir un nuevo registro fue creado 
    en la tabla Product.
*/

// to use express.Router()
const express = require("express");
const router = express.Router();

// make the route available for /product_created
router.get("/", (reg, res) => {
    // Desplegar el templete que indica que el product fue 
    // creado
    res.render("view_product_created.ejs");
});

// Export the module About.js
module.exports = router;

//select_a_product_to_delete.js

/*
    The GET /edit/xxx route
    Code a first route to display the book to be modified when responding to the 
    GET /edit/xxx request 
    (when the user has clicked on an [Edit] button in the book list).

    To do this, we define the URL to be managed in the form 
    "/edit/:id" where":id" corresponds to the identifier of the record to be updated. 
    This identifier is retrieved via the Request object of the Express framework, 
    in the list of its parameters: req.params.id.

    Then make a "SELECT..." request to obtain the book corresponding to this 
    identifier. This request is executed via the db.get() method of SQlite3 which 
    returns a single result and which is therefore more convenient to use than the 
    db.all() method when making a SELECT by identifier. 
    In this case, we pass as 2nd parameter the identifier of the book to be displayed 
    because we used a parameterized query (via the "... = ?") to avoid SQL injection. 
    When the query is completed, the callback function can in turn transmit the result 
    to the view.
*/
// Set router
const express = require("express");
// tell Router to inherit params from parents
// The parameter { mergeParams: true } should be used when 
// the route has parameters, this way the editing is done correctly
const router = express.Router( { mergeParams: true } );
// Import db no es requerido
// db_sequelize ya da el acceso mediante los
// modelos de las tablas. Unicamente es necesario
// utilizar la referencia al nombre del modelo
// por ejemplo Book, asi que no es necesario incluir
// const db_sequelize = require("../db_sequelize);

// GET /select_a_product_to_delete/5
router.get("/", async (req, res) => {
        
    //La variable req.params.id es el numero de registro
    //a eliminar
    const id = req.params.id;
    
    //Realizar un query en la tabla Book para obtener
    //el registro que coresponde al Book_id
    const path = require("path");
    const Product = require(path.join(__dirname,'..','models', 'Product.js'));
    
    const producto = await Product.findOne({ where: { id: req.params.id } });
    if (producto === null) {
      res.send("Product no encontrado");
    }
    
    // Los datos del producto se obtienen en formato JSON:
    // {"Book_id":1,"Title":"1","Author":"1","Comments":"        \r\n    1","myDate":"2024-03-16T22:29:17.320Z","createdAt":"2024-03-16T22:29:17.322Z","updatedAt":"2024-03-16T22:29:17.322Z"}
    // la forma de acceder a los metadatos es la siguiente:
    //libro.myDate,
    //etc.
    
    //Como se tienen los metados del registro
    //entonces hay que desplegarlos en el template
    //view_editar_un_libro
    
    res.render("view_confirm_delete_product.ejs", { model: producto });

});

module.exports = router;

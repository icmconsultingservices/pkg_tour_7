//atualizar_edicion_del_libro.js

// Set router
const express = require("express");
// tell Router to inherit params from parents
// The parameter { mergeParams: true } should be used when 
// the route has parameters, this way the editing is done correctly
const router = express.Router( { mergeParams: true } );


// POST /actualizar_edicion_del_libro/5
router.post("/", async (req, res) => {
        
    // Get Book Model
    const path = require("path");
    const Book = require(path.join(__dirname,'..','models', 'Book.js'));
    
    //Actualizar los metados    
    await Book.update({
                Title: req.body.Title, 
                Author: req.body.Author, 
                Comments: req.body.Comments
            }, {
                where: {
                    Book_id: req.params.Book_id,
                },
            });    

    //Si los datos fueron actualizados, 
    //entonces informar el usuario
    res.redirect("/libro_editado");
        
});


//////////////
module.exports = router;

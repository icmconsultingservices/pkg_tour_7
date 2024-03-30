/*
    crear_un_libro.js
*/

// to use express.Router()
const express = require("express");
const router = express.Router();

// make the route available for /crear_un_libro
router.post("/", async (req, res) => {
    
    // Get Book Model
    const path = require("path");
    const Book = require(path.join(__dirname,'..','models', 'Book.js'));

    await Book.create({
        Title: req.body.Title,
        Author: req.body.Author,
        Comments: req.body.Comments
                }).then((result) => {
                    // The book has been created
                    {}
                }).catch((error) => {
        console.log(error);
            console.log("El libro no se creo!");
        });
    // As the book has been created, then
    // redirect the control to /libro_creado
    // which indicates that a book has been created
    res.redirect("/libro_creado");
});

// Export the module About.js
module.exports = router;

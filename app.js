//app.js
const express = require("express");

// Create de Express Server
const app = express();

// Server configuration
app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false })); // <--- middleware configuration
/*
The middleware "express.urlencoded()"
it is necessary to use the middleware "express.urlencoded()" so that Request.body 
retrieves the posted values. This is simply done by an app.use() when configuring the 
server.
This middleware allows you to retrieve the data sent as 
"Content-Type: application/x-www-form-urlencoded", which is the standard for values 
posted from a form. For information, it is very often used with "express.json()" 
middleware for data sent as "Content-Type: application/json", 
but here it is not necessary.
SEE: https://blog.pagesd.info/2019/10/08/crud-with-express-sqlite-10-steps/


The middleware configuration is a must to be included
In the case that middleware configuration is not included, the POST
when trying to update a record will return
TypeError: Cannot read properties of undefined (reading 'Title')
so the line of code
app.use(express.urlencoded({ extended: false }));
is needed. A MUST to be included.

*/
    
///Import db_sequelize utilizando el script de configuracion de la base de datos
// db_sequelize.js
const db_sequelize = require(path.join(__dirname, 'config', 'db_sequelize.js'));
// __dirname: It is a local variable that returns the directory name of the current module. It returns the folder path of the current JavaScript file.


///////////////////////////
//Testing the connection
/**
 * Create a anonymous function to establish the database connection.
 * After the connection is established, start the server.
 */
const initApp = async () => {
    console.log(Date()+ " " + "Testing the database connection db_sequelize..");
    /**
     * Test the connection.
     * You can use the .authenticate() function to test if the connection works.
     */
    try {
        await db_sequelize.authenticate();
        console.log(Date() + " " + "Connection db_sequelize has been established successfully.");

        /**
         * Start the web server on the specified port.
         */
        // listen on port 500
        const port = 5000;
        app.listen(process.env.PORT || port, () => {
            console.log(Date() + " " + `Server is up, running and listening on: http://localhost:${port}`);
        });
        
    } catch (error) {
        console.error(Date() + " " + "Unable to connect to the database db_sequelize:", error.original);
    }
};

/**
 * Initialize the application.
 */
initApp();
//////////////////////////

//Create Book table using Sequelize
//Import model Books.js
// En lugar de utilizar la instruccion siguiente:
//const Book = require(path.join(__dirname,'/models/Book.js'));
//se puede utilizar la siguientes, que esta en linea con los
//standares de codificacion en Javascript.
const Book = require(path.join(__dirname,'models', 'Book.js'));
// Crear la table fisicamente en la bd
// Create all the table defined using   
// sequelize in Database  

// One to One Relationship
// Model Customer
// Create Customer table using Sequelize
const Customer = require(path.join(__dirname,'models', 'Customer.js'));
// Crear la table fisicamente en la bd
// Create all the table defined using   
// sequelize in Database  

// One to One Relationship
// Model Address
// Create Address table using Sequelize
const Address = require(path.join(__dirname,'models', 'Address.js'));
// Crear la table fisicamente en la bd
// Create all the table defined using   
// sequelize in Database  


// 1:M relationship
// Product --> Review
// Model Product
// Create Product table using Sequelize
//const Product = require('./Product.js');
const Product = require(path.join(__dirname,'models', 'Product.js'));
// Crear la table fisicamente en la bd
// Create all the table defined using   
// sequelize in Database  

// Model Review
// Create Review table using Sequelize
//const Review = require('./Review.js');
const Review = require(path.join(__dirname,'models', 'Review.js'));
// Crear la table fisicamente en la bd
// Create all the table defined using   
// sequelize in Database  

// Model User
// Create User table using Sequelize
const User = require(path.join(__dirname,'models', 'User.js'));
// Crear la table fisicamente en la bd
// Create all the table defined using   
// sequelize in Database  

// Model Assign
// Create User table using Sequelize
const Assign = require(path.join(__dirname,'models', 'Assign.js'));
// Crear la table fisicamente en la bd
// Create all the table defined using   
// sequelize in Database  



/* 
One to One relationship between Customer and Address
the effect after the execution is that the metadata
AddressId is created into the Customer Table and
for the queries to get the rows that are linked
is needed to use raw queries.
*/
Address.hasOne(Customer);
Customer.belongsTo(Address);


/* 
One to One relationship between Product and Review
the effect after the execution is that the metadata
ReviewId is created into the Product Table and
for the queries to get the rows that are linked
is needed to use raw queries.
*/
Review.hasMany(Product);
Product.belongsTo(Review);


/******************************************
https://www.educba.com/sql-join-two-tables/
Check this site in case needed for queries using
one to many, or many to many relationships
for raw queries

For Seuqelize associations can check
https://gist.github.com/ajLapid718/dfb48815a7472e9f6df09131bd0a7d49
*******************************************/




//Investigar con prueba de campo, el importar el script 
//create_product_datos_de_prueba_de_campo.js
//para evitar que el codigo sea muy grande
//de esta manera se mantienen modular
//o buscar urls de imagenes que sean mas pequenos
//o se puede procesar el url para crear un short url
//y de esta manera el codigo se mantiene pequeno
// Create products
/*
db_sequelize.query(
    'INSERT INTO Product (id, image, title, price, description, published) VALUES (6,"https://lh5.googleusercontent.com/p/AF1QipP1J_W9SRQv4YGXecQZkxPyf2384PO_x562CxHL=w540-h312-n-k-no", "Seoul",  1, "Capital of South Korea", true');

console.log("Product 6 inserted");
*/

// Sync all models
db_sequelize.sync({force:true});
// using force true the tables are created into the database
// everytime the app is executed
//db_sequelize.sync({force:false});


// Investigar como se pueden desplegar los nombres de las
// tablas creadas por SEQUELIZE ORM, y de esta forma
// se valida que las tablas estan creadas.

//Incluir declaracion de 1:1
//entre la tabla Customer y la Tabla Address
//implementar el script
//obtener_la_direccion_customer_id
//Este es el ejemplo de la aplicacion de una
//relacion de 1:1 con sequelize

// PRUEBA DE ONE TO ONE RELATIONSHIP
// Obtener la direccion del cliente 1
/*
let  obtener_direccion_customer_id = async function(){
  try {
      let customer = await Customer.findByPk(1);
      //lamada asyncronica a Customer con find by primary key
      let customerAddress = await customer.getAddress();
      //como la tabla Address belongs to Customer
      //entonces se puede escribir el customer.getAddress();
      //para obtener la direccion que corresponde al customer
      //con id 1
      console.log("NUI del Customer    : ", customer.customer_id);
      console.log("Nombre del customer : ", customer.first_name + " " + customer.last_name);
      //console.log("Direccion Customer  : ", customerAddress.address);      
      console.log("Direccion Customer  : ", customerAddress.address);      
  } catch (error) { console.error("Error log", error);}
}

obtener_direccion_customer_id();
*/

//Here we will import the route /listar_customers
//which is locate into /routes/listar_customer.js
const listar_customersRoute = require('./routes/listar_customers.js');
app.use('/listar_customers', listar_customersRoute);


// *********************************

app.use(express.static(path.join(__dirname, "/uploads")));
//Index.js
// Here we will import the route /
// which is locate into /routes/Index.js
const indexRoute = require('./routes/Index');
app.use('/', indexRoute);

// About.js
// Here we will import the route /about
// which is locate into /routes/About.js
const aboutRoute = require('./routes/About');
app.use('/about', aboutRoute);


/*
    // GET /data
    Send data from the server to the view
    The application's navigation bar also contains the "Data" choice that sends to the URL "http://localhost:3000/data". 
    This URL will be used to see how to "inject" data into the view from the program.

    First of all, it is necessary to add a function to "index.js" to take into account
    the URL "/data" and render the corresponding view, but this time by adding the 
    object to be transmitted to it.
*/

app.get("/data", (req, res) => {
  const test = {
    title: "Puntos destacados del recorrido",
    items: [
        "Seúl: explore la cautivadora capital de la nación; Palacio Gyeongbokgung, Templo Jogyesa, Callejón de antigüedades de Insadong, Arroyo Cheonggycheon y Torre de Seúl en el monte Namsan", 
        "La DMZ: visite una de las fronteras más militarizadas del mundo, el Parque Imjingak construido para honrar a los desplazados tanto del Norte como del Sur de Corea, el Observatorio Dora.", 
        "Andong: descubra el pueblo folclórico Hahoe y el museo folclórico de Andong, declarados Patrimonio de la Humanidad por la UNESCO"]
  };
  res.render("data.ejs", { model: test });
});



/*
    Model Product

    Implementation of CRUD operations for the model . As much
    as posible implementation is modular using const 
    router = express.Router( { mergeParams: true } );
    to redirect actions to the routes. In this way the code
    mantain modularity provisioning smooth maintenance for the
    source code. Mainly in the cases that the source code is
    maintained using a source control version system such as git
    and also this modularity facilitates to use continious integration
    and continous deployment aka CI/CD.
*/

//Incluir declaracion de 1:M
//entre la tabla Product y la Tabla Review
//listar_productos.js
//Product.hasMany(Review, ..)
//Review.belongsTo(Product, ...)
//Este es el ejemplo de la aplicacion de una
//relacion de 1:m con sequelize
//Here we will import the route /listar_productos
//which is locate into /routes/listar_productos.js
const listar_productosRoute = require('./routes/listar_productos.js');
app.use('/listar_productos', listar_productosRoute);


// view_enter_product_data
app.get("/view_enter_product_data", (req, res) => {
  res.render("view_enter_product_data.ejs", { model: {} });
});

// Configurar esta ruta con async await
// y crear la ruta en el folder /routes
// para que todo este en forma modular
// create_a_product
app.post("/create_a_product", (req, res) => {
    Product.create({
        image: req.body.image,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published,
        // As a new product is created then
        // the metadata Product.ReviewId is
        // asigned accordingly to the selection
        // using the dropdown box options
        // get data from dropdown box
        // use radix 10 to convert text to Integer
        ReviewId: parseInt(req.body.ReviewId, 10)        
                }).then((result) => {
            console.log("Producto creado!");
                }).catch((error) => {
        console.log(error);
            console.log("El producto no se creo!");
        });
    console.log("Redireccionar a /product_created");
    // Como el producto fue creado
    // redireccionar el control a la pantalla
    // que indica que el producto fue creado
    res.redirect("/product_created");
});

// product_created.js
// Here we will import the route /product_created
// which is locate into /routes/product_created.js
const product_createdRoute = require('./routes/product_created.js');
app.use('/product_created', product_createdRoute);


//edit_a_product.js
//GET
const edit_a_productRoute = require('./routes/edit_a_product.js');
app.use('/edit_a_product/:id', edit_a_productRoute);

// POST /edit_a_product/5
app.post("/edit_a_product/:id", async (req, res) => {
        
    //Actualizar los metados    
    await Product.update({ 
        image: req.body.image, 
        title: req.body.title, 
        price: req.body.price,
        description: req.body.description,
        published: req.body.published,
        // use radix 10 to convert text to Integer
        ReviewId: parseInt(req.body.ReviewId, 10)}, {
        where: {
            id: req.params.id
        },
    });    

    //Si los datos fueron actualizados, 
    //entonces informar el usuario
    //edited_product.js change to the_product_has_been_edited.js
    res.redirect("/edited_product");
        
});

// edited_product.js change to the_product_has_been_edited.js
// Here we will import the route /edited_product
// which is locate into /routes/edited_product.js
const edited_productRoute = require('./routes/edited_product.js');
app.use('/edited_product', edited_productRoute);


// select a product to delete
// the first step to delete a product is
// to get product details, once the product
// details are obtained, then display the product details,
// then inquire the user confirmation to delete the product
const select_a_product_to_deleteRoute = require('./routes/select_a_product_to_delete.js');
app.use('/select_a_product_to_delete/:id', select_a_product_to_deleteRoute);


//Delete the product
app.post("/delete_the_product/:id", async (req, res) => {
    const id = req.params.id;
    // to delete the product SEQUELIZE is being used
    // remember async and await always goes together
    // Delete every product with id equal id
    await Product.destroy({
        where: {
            id: id
        },
    });
    // send confirmation to user alerting that product
    // has been removed from the table
    res.redirect("/the_product_has_been_removed");
    
});


// the_product_has_been_removed.js
// Here we will import the route /the_product_has_been_removed
// which is locate into /routes/the_product_has_been_removed.js
const the_product_has_been_removedRoute = require('./routes/the_product_has_been_removed.js');
app.use('/the_product_has_been_removed', the_product_has_been_removedRoute);




/*
    Model Book

    Implementation of CRUD operations for the model . As much
    as posible implementation is modular using const 
    router = express.Router( { mergeParams: true } );
    to redirect actions to the routes. In this way the code
    mantain modularity provisioning smooth maintenance for the
    source code. Mainly in the cases that the source code is
    maintained using a source control version system such as git
    and also this modularity facilitates to use continious integration
    and continous deployment aka CI/CD.
*/

// GET / editar_un_libro
// editar_un_libro.js
const editar_un_libroRoute = require('./routes/editar_un_libro.js');
app.use('/editar_un_libro/:Book_id', editar_un_libroRoute);

// POST /actualizar_edicion_del_libro/5
// actualizar_edicion_del_libro.js
const actualizar_edicion_del_libroRoute = require('./routes/actualizar_edicion_del_libro.js');
app.use('/actualizar_edicion_del_libro/:Book_id', actualizar_edicion_del_libroRoute);

// libro_editado.js
// Here we will import the route /libro_editado
// which is locate into /routes/libro_editado.js
const libro_editadoRoute = require('./routes/libro_editado.js');
app.use('/libro_editado', libro_editadoRoute);

//listar_libros.js
//Here we will import the route /listar_libros
//which is locate into /routes/listar_libros.js
const listar_librosRoute = require('./routes/listar_libros.js');
app.use('/listar_libros', listar_librosRoute);

// view_ingresar_datos_del_libro
app.get("/view_ingresar_datos_del_libro", (req, res) => {
  res.render("view_ingresar_datos_del_libro.ejs", { model: {} });
});

// Make available the route to create a book
const crear_un_libroRoute = require('./routes/crear_un_libro.js');
app.use('/crear_un_libro', crear_un_libroRoute);

// libro_creado.js
// Here we will import the route /libro_creado
// which is locate into /routes/libro_creado.js
const libro_creadoRoute = require('./routes/libro_creado.js');
app.use('/libro_creado', libro_creadoRoute);

//Eliminar Libro
//Para eliminar un libro de la tabla `Book`
//el primer paso obtener los detalles del libro
//que se desea eliminar. Una vez que se obtienen
//los detalles, hay que desplegar los detalles, y
//solicitar la confirmacion del usuario para proceder
//a eliminar el libro.
//editar_un_libro.js
const seleccionar_libro_eliminarRoute = require('./routes/seleccionar_libro_eliminar.js');
app.use('/seleccionar_libro_eliminar/:Book_id', seleccionar_libro_eliminarRoute);



// Eliminar libro
// To be implement the route to eliminate the book from
// the table using route, this means create a file
// into /routes folder named eliminar_libro.js
app.post("/eliminar_libro/:Book_id", async (req, res) => {
    const id = req.params.Book_id;
    //implementar eliminar libro utilizando SEQUELIZE
    //recordar incluir async y await (siempre van juntos)
    // Delete everyone Book_id ""
    await Book.destroy({
        where: {
            Book_id: id
        },
    });
    //enviar confirmacion que el libro ha sido eliminado
    console.log("Libro eliminado");
    res.redirect("/libro_eliminado");
    
});

// libro_eliminado.js
// Here we will import the route /libro_eliminado
// which is locate into /routes/libro_eliminado.js
const libro_eliminadoRoute = require('./routes/libro_eliminado.js');
app.use('/libro_eliminado', libro_eliminadoRoute);

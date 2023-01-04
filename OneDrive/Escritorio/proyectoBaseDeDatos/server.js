const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan')

const app = express();



// Vamos a configurar un middleware para leer fácilmente
// las variables del body, que las usaremos en los endpoints
// de tipo POST

//console.log('Entorno: ', process.env)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", function (req, res){
    res.send("hola");
} )

app.listen(5000);


console.log('hola');
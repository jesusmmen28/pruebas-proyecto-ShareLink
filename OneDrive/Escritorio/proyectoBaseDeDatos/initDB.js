require("dotenv").config();

const { getConnection } = require("./db");
// const { formatDateToDB } = require("./helpers");
// const { random } = require("lodash");

let connection;

async function main() {
    try {
    connection = await getConnection();

    // Borrar las tablas si existen 
    console.log("Borrando tablas");

    await connection.query("DROP TABLE IF EXISTS Usuarios");
    await connection.query("DROP TABLE IF EXISTS Productos");

     // Crear las tablas de nuevo
     console.log("Creando tablas");

     await connection.query(`
     CREATE TABLE Usuarios (
       id INTEGER PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR(50) NOT NULL,
       surname VARCHAR(50) NOT NULL,
       direccion VARCHAR(100) NOT NULL
     );
   `);

   await connection.query(`
       CREATE TABLE Productos (
         id INTEGER PRIMARY KEY AUTO_INCREMENT,
         tipo VARCHAR(50) NOT NULL,
         nombre VARCHAR(100) NOT NULL,
         categoria VARCHAR(50) NOT NULL,
         id_usuario INT,
         FOREIGN KEY (id_usuario) REFERENCES Usuarios (id)
       )
   `)
} catch (error) {
    console.error(error);
  } finally {
    console.log("Todo hecho, liberando conexión");
    if (connection) connection.release();
    process.exit();
}
}

main();


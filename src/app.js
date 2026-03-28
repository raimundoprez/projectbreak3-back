const express = require("express");
const cors = require("cors");

const dbConnect = require("./config/db.js");

// intentamos conectar a BBDD y, si falla la conexión, la excepción que se lanza aborta el programa
dbConnect();

const app = express();

// habilitar cors para todas las rutas
app.use(cors());

// habilitar procesamiento de JSON
app.use(express.json());

module.exports = app;
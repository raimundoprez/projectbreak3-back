require("./env.js");

const app = require("./app.js");

const server = app.listen(process.env.SERVER_PORT, error => {
    if (error)
        console.error("Error iniciando el servidor", error);
    else
        console.log("Servidor iniciado en el puerto " + server.address().port);
});
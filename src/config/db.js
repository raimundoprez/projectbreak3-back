const mongoose = require("mongoose");

async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Establecida una conexión a BBDD");
    }
    catch(error) {
        throw new Error("Error conectando a BBDD", {cause: error});
    }
}

module.exports = dbConnect;
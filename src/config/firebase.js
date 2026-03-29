const admin = require("firebase-admin");

function firebaseInit() {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        console.log("Firebase inicializado correctamente");
    }
    catch(error) {
        throw new Error("Error inicializando Firebase", {cause: error});
    }
}

module.exports = firebaseInit;
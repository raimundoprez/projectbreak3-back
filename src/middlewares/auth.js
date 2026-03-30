const admin = require("firebase-admin");

async function auth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({error: "No authorization token provided"});
        }
        else {
            const idToken = authHeader.split(" ")[1];
            const decodedToken = await admin.auth().verifyIdToken(idToken, true);

            res.locals.userId = decodedToken.uid;
            next();
        }
    }
    catch(error) {
        console.error("Error en auth middleware", error);
        res.status(401).json({error: "Invalid or expired token"});
    }
}

module.exports = auth;
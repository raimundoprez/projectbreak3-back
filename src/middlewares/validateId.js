const mongoose = require("mongoose");

function validateId(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        res.status(400).json({error: "ID de chore inválido"});
    else
        next();
}

module.exports = validateId;
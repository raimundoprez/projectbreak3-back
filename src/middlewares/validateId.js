const mongoose = require("mongoose");

function validateId(req, res, next) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(400).json({error: "Invalid chore ID"});
    else
        next();
}

module.exports = validateId;
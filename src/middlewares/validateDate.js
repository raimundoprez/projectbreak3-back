function validateDate(req, res, next) {
    const localDate = new Date(req.params.date);

    if (isNaN(localDate)) {
        res.status(400).json({error: "Invalid date format"});
    }
    else {
        req.params.date = new Date(Date.UTC(
            localDate.getFullYear(),
            localDate.getMonth(),
            localDate.getDate(),
            0, 0, 0, 0
        ));

        next();
    }
}

module.exports = validateDate;
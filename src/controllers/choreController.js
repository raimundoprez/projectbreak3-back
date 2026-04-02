const Chore = require("../models/Chore.js");

// lee una request, obtiene un objeto chore mandado por el usuario (sin completedDays), valida las keys y lo devuelve
function getChoreParams(req) {
    if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) return null;

    const {name, category, duration, startDate, endDate} = req.body;
    const params = {name, category, duration, startDate, endDate};
    const entries = Object.entries(params).filter(([, value]) => value !== undefined);

    return Object.fromEntries(entries);
}

// obtiene todas las chores del usuario y opcionalmente filtra por categoría
async function getAllChores(req, res) {
    const searchObject = {userId: res.locals.userId};

    const category = req.query.category;
    if (category) searchObject.category = category;

    try {
        const chores = await Chore.find(searchObject);
        res.json(chores);
    }
    catch(error) {
        console.error("Error obteniendo la lista de chores", error);
        res.status(500).json({error: "Error obtaining the chore list"});
    }
}

// obtiene una chore en particular (debe pertenecer al usuario)
async function getChore(req, res) {
    const id = req.params.id;

    try {
        const chore = await Chore.findOne({_id: id, userId: res.locals.userId});

        if (!chore)
            res.status(404).json({error: "Chore not found"});
        else
            res.json(chore);
    }
    catch(error) {
        console.error(`Error obteniendo la chore ${id}`, error);
        res.status(500).json({error: "Error obtaining the chore"});
    }
}

// crea una nueva chore para el usuario
async function createChore(req, res) {
    const params = getChoreParams(req);

    if (params !== null) {
        params.userId = res.locals.userId;

        try {
            const chore = await Chore.create(params);
            res.status(201).json(chore);
        }
        catch(error) {
            console.error(`Error al crear una chore con los parámetros: ${JSON.stringify(params)}`, error);
            res.status(500).json({error: "Failed to create the chore"});
        }
    }
    else {
        res.status(400).json({error: "An invalid object was received"});
    }
}

module.exports = {getAllChores, getChore, createChore};
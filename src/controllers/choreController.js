const Chore = require("../models/Chore.js");

// lee una request, obtiene un objeto chore mandado por el usuario (sin completedDays), valida las keys y lo devuelve
function getChoreParams(req, res) {
    if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) return null;

    const {name, category, duration, startDate, endDate} = req.body;
    const params = {name, category, duration, startDate, endDate};

    const entries = Object.entries(params).filter(([, value]) => value !== undefined);

    const choreParams = Object.fromEntries(entries);
    choreParams.userId = res.locals.userId;

    return choreParams;
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
    const params = getChoreParams(req, res);

    if (params !== null) {
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

// actualiza una chore (debe pertenecer al usuario)
async function updateChore(req, res) {
    const id = req.params.id;
    const params = getChoreParams(req, res);

    if (params !== null) {
        try {
            const chore = await Chore.findOne({_id: id, userId: res.locals.userId});

            if (!chore) {
                res.status(404).json({error: "Chore not found"});
            }
            else {
                Object.assign(chore, params);
                await chore.save();

                res.json(chore);
            }
        }
        catch(error) {
            console.error(`Error al actualizar la chore ${id} con los parámetros: ${JSON.stringify(params)}`, error);
            res.status(500).json({error: "Failed to update the chore"});
        }
    }
    else {
        res.status(400).json({error: "An invalid object was received"});
    }
}

async function deleteChore(req, res) {
    const id = req.params.id;

    try {
        const chore = await Chore.findOneAndDelete({_id: id, userId: res.locals.userId});
        
        if (!chore)
            res.status(404).json({error: "Chore not found"});
        else
            res.json(chore);
    }
    catch(error) {
        console.error(`Error al borrar la chore ${id}`, error);
        res.status(500).json({error: "Error deleting the chore"})
    }
}

async function addCompletedDay(req, res) {
    const id = req.params.id;
    const date = req.params.date;

    try {
        const chore = await Chore.findOne({_id: id, userId: res.locals.userId});

        if (!chore) {
            res.status(404).json({error: "Chore not found"});
        }
        else {
            if (chore.completedDays.some((day) => day.getTime() === date.getTime())) {
                res.status(400).json({error: "The date provided already exists in the completed days list"});
            }
            else {
                chore.completedDays.push(date);
                chore.completedDays.sort((a, b) => a - b);

                await chore.save();
                res.json(chore.completedDays);
            }
        }
    }
    catch(error) {
        console.error(`Error al añadir a la chore ${id} el día ${date}`, error);
        res.status(500).json({error: "Failed to add the day to the chore"});
    }
}

async function removeCompletedDay(req, res) {
    const id = req.params.id;
    const date = req.params.date;

    try {
        const chore = await Chore.findOne({_id: id, userId: res.locals.userId});

        if (!chore) {
            res.status(404).json({error: "Chore not found"});
        }
        else {
            const newCompleted = chore.completedDays.filter((day) => day.getTime() !== date.getTime());

            if (newCompleted.length === chore.completedDays.length) {
                res.status(400).json({error: "The date provided doesn't exist in the completed days list"});
            }
            else {
                chore.completedDays = newCompleted;

                await chore.save();
                res.json(chore.completedDays);
            }
        }
    }
    catch(error) {
        console.error(`Error al borrar de la chore ${id} el día ${date}`, error);
        res.status(500).json({error: "Failed to remove the day from the chore"});
    }
}

module.exports = {getAllChores, getChore, createChore, updateChore, deleteChore, addCompletedDay, removeCompletedDay};
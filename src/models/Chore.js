const mongoose = require("mongoose");

const categories = ["Hogar", "Salud", "Trabajo", "Estudio", "Otro"];
const maxRange = 30;

function formatDate(date) {
    if (typeof date !== "string") return null;

    const localDate = new Date(date);
    if (isNaN(localDate)) return null;

    const utcDate = new Date(Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
        0, 0, 0, 0
    ));

    return utcDate;
}

function formatDateArray(dates) {
    if (!Array.isArray(dates)) return null;
    return dates.map(formatDate);
}

const choreSchema = new mongoose.Schema({
    userId: {type: String, minLength: 1, maxLength: 200, required: true, index: true},
    name: {type: String, minLength: 1, maxLength: 100, required: true, trim: true},
    category: {type: String, enum: categories, required: true},
    duration: {type: Number, min: 1, required: true, validate: [Number.isInteger, "{VALUE} no es un entero"]},
    startDate: {type: Date, required: true, set: formatDate},
    endDate: {type: Date, required: true, set: formatDate},
    completedDays: {type: [{type: Date, required: true}], required: true, default: [], set: formatDateArray}
},
{
    timestamps: true
});

choreSchema.pre("validate", function(next) {
    if (this.startDate && this.endDate && this.completedDays && this.completedDays.every((date) => date !== null)) {
        const diffMs = this.endDate - this.startDate;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (diffDays < 0)
            next(new Error("La fecha final debe ser mayor o igual que la inicial"));
        else if (diffDays > maxRange)
            next(new Error(`La fecha final no puede exceder los ${maxRange} día(s) desde la fecha inicial`));
        else {
            const inRange = this.completedDays.every((date) => date >= this.startDate && date <= this.endDate);

            if (!inRange)
                next(new Error("Algunos días están fuera de rango"));
            else
                next();
        }
    }
    else {
        // como estos campos son required, las validaciones por defecto no dejarán guardar
        next();
    }
});

const Chore = mongoose.model("Chore", choreSchema);
module.exports = Chore;
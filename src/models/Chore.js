const mongoose = require("mongoose");

const categories = ["Hogar", "Salud", "Trabajo", "Estudio", "Otro"];
const maxRange = 30;

function formatDate(date) {
    if (typeof date !== "string") return null;

    const newDate = new Date(date);
    if (isNaN(newDate)) return null;

    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

function formatDateArray(dates) {
    if (!Array.isArray(dates)) return null;
    return dates.map(formatDate);
}

const choreSchema = new mongoose.Schema({
    userId: {type: String, minLength: 1, maxLength: 200, required: true, index: true},
    name: {type: String, minLength: 1, maxLength: 100, required: true, trim: true},
    category: {type: String, enum: categories, required: true},
    duration: {type: Number, min: 1, required: true, validate: [Number.isInteger, "{VALUE} is not an integer"]},
    startDate: {type: Date, required: true, set: formatDate},
    endDate: {type: Date, required: true, set: formatDate},
    completedDays: {type: [Date], default: [], set: formatDateArray}
},
{
    timestamps: true
});

choreSchema.pre("validate", function(next) {
    if (this.startDate && this.endDate && this.completedDays && this.completedDays.every((date) => date !== null)) {
        const diffMs = this.endDate - this.startDate;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (diffDays < 0)
            next(new Error("End date must be greater than start date"));
        else if (diffDays > maxRange)
            next(new Error(`End date can't be more than ${maxRange} day(s) after start date`));
        else {
            const inRange = this.completedDays.every((date) => date >= this.startDate && date <= this.endDate);

            if (!inRange)
                next(new Error("Some days are out of range"));
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
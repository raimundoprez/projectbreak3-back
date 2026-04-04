const {categories, Chore} = require("../models/Chore.js");

module.exports = {
    components: {
        schemas: {
            id: {
                type: "ObjectId",
                description: "Identificador de chore",
                examples: "697a447b3f34a33e0eb655ed"
            },
            date: {
                type: "string",
                description: "Una fecha JS en formato string",
                examples: "2026-12-30"
            },
            dates: {
                type: "array",
                description: "Un array de fechas JS",
                items: {
                    $ref: "#/components/schemas/date"
                }
            },
            category: {
                type: "string",
                description: "Categoría de chore",
                enum: categories
            },
            Chore: {
                type: "object",
                properties: {
                    _id: {
                        $ref: "#/components/schemas/id"
                    },
                    userId: {
                        type: "string",
                        description: "Identificador único de usuario en Firebase",
                        minLength: Chore.schema.path("userId").validators.find(v => v.type === "minlength")?.minlength,
                        maxLength: Chore.schema.path("userId").validators.find(v => v.type === "maxlength")?.maxlength,
                        examples: "wJ4H6b9QkP1Rf3c7Z0aYxD2E"
                    },
                    name: {
                        type: "string",
                        description: "Nombre único descriptivo para una chore",
                        minLength: Chore.schema.path("name").validators.find(v => v.type === "minlength")?.minlength,
                        maxLength: Chore.schema.path("name").validators.find(v => v.type === "maxlength")?.maxlength,
                        examples: "Hacer la compra"
                    },
                    category: {
                        $ref: "#/components/schemas/category"
                    },
                    duration: {
                        type: "number",
                        description: "Duración de una chore en minutos sin decimales",
                        min: Chore.schema.path("duration").validators.find(v => v.type === "min")?.min,
                        examples: 25
                    },
                    startDate: {
                        $ref: "#/components/schemas/date"
                    },
                    endDate: {
                        $ref: "#/components/schemas/date"
                    },
                    completedDays: {
                        $ref: "#/components/schemas/dates"
                    }
                },
                required: ["name", "category", "duration", "startDate", "endDate"]
            },
            Chores: {
                type: "array",
                description: "Un array de chores",
                items: {
                    $ref: "#/components/schemas/Chore"
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ]
};
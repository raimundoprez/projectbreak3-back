module.exports = {
    paths: {
        "/api/chore": {
            get: {
                tags: ["Chores"],
                description: "Obtiene todas las chores de un usuario. Si se proporciona una categoría, solo obtiene las que pertenezcan a ella.",
                parameters: [
                    {
                        name: "category",
                        in: "query",
                        description: "Categoría de la chore",
                        schema: {
                            $ref: "#/components/schemas/category"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Operación completada.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Chores"
                                }
                            }
                        }
                    },
                    401: {description: "No se ha proporcionado un token de acceso o este no es válido."},
                    500: {description: "Error de servidor."}
                }
            },
            post: {
                tags: ["Chores"],
                description: "Crea una chore para un usuario con los parámetros proporcionados y un array de días completados vacío.",
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Chore"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Operación completada.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Chore"
                                }
                            }
                        }
                    },
                    400: {description: "Los parámetros recibidos tienen un formato inválido."},
                    401: {description: "No se ha proporcionado un token de acceso o este no es válido."},
                    500: {description: "Error de servidor."}
                }
            }
        },
        "/api/chore/{id}": {
            get: {
                tags: ["Chores"],
                description: "Obtiene una chore por su ID. Dicha chore debe pertenecer al usuario que realiza la solicitud.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID de la chore",
                        schema: {
                            $ref: "#/components/schemas/id"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Operación completada.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Chore"
                                }
                            }
                        }
                    },
                    400: {description: "El formato del ID de chore proporcionado no es válido."},
                    401: {description: "No se ha proporcionado un token de acceso o este no es válido."},
                    404: {description: "Chore no encontrada."},
                    500: {description: "Error de servidor."}
                }
            },
            put: {
                tags: ["Chores"],
                description: "Actualiza una chore del usuario solicitante con los parámetros proporcionados.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID de la chore",
                        schema: {
                            $ref: "#/components/schemas/id"
                        }
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Chore"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Operación completada.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Chore"
                                }
                            }
                        }
                    },
                    400: {description: "El formato del ID de chore o los parámetros proporcionados no son válidos."},
                    401: {description: "No se ha proporcionado un token de acceso o este no es válido."},
                    404: {description: "Chore no encontrada."},
                    500: {description: "Error de servidor."}
                }
            },
            delete: {
                tags: ["Chores"],
                description: "Borra una chore del usuario solicitante.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID de la chore",
                        schema: {
                            $ref: "#/components/schemas/id"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Operación completada.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Chore"
                                }
                            }
                        }
                    },
                    400: {description: "El formato del ID de chore proporcionado no es válido."},
                    401: {description: "No se ha proporcionado un token de acceso o este no es válido."},
                    404: {description: "Chore no encontrada."},
                    500: {description: "Error de servidor."}
                }
            }
        },
        "/api/chore/{id}/completedDays/{date}": {
            post: {
                tags: ["Chores"],
                description: "Añade un día al array de días completados de una chore del usuario solicitante.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID de la chore",
                        schema: {
                            $ref: "#/components/schemas/id"
                        }
                    },
                    {
                        name: "date",
                        in: "path",
                        description: "La fecha a añadir",
                        schema: {
                            $ref: "#/components/schemas/date"
                        }
                    }
                ],
                responses: {
                    201: {
                        description: "Operación completada.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/dates"
                                }
                            }
                        }
                    },
                    400: {description: "El formato del ID de chore o de la fecha proporcionada no son válidos o la fecha ya existía."},
                    401: {description: "No se ha proporcionado un token de acceso o este no es válido."},
                    404: {description: "Chore no encontrada."},
                    500: {description: "Error de servidor."}
                }
            },
            delete: {
                tags: ["Chores"],
                description: "Borra un día del array de días completados de una chore del usuario solicitante.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "ID de la chore",
                        schema: {
                            $ref: "#/components/schemas/id"
                        }
                    },
                    {
                        name: "date",
                        in: "path",
                        description: "La fecha a borrar",
                        schema: {
                            $ref: "#/components/schemas/date"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Operación completada.",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/dates"
                                }
                            }
                        }
                    },
                    400: {description: "El formato del ID de chore o de la fecha proporcionada no son válidos o la fecha no existía."},
                    401: {description: "No se ha proporcionado un token de acceso o este no es válido."},
                    404: {description: "Chore no encontrada."},
                    500: {description: "Error de servidor."}
                }
            }
        }
    }
};
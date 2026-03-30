const express = require("express");

const auth = require("../middlewares/auth.js");
const controller = require("../controllers/choreController.js");

const router = express.Router();

router.get("/chore", auth, controller.getAllChores);

module.exports = router;
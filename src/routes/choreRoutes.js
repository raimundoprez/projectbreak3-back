const express = require("express");

const auth = require("../middlewares/auth.js");
const controller = require("../controllers/choreController.js");

const router = express.Router();

router.get("/chore", auth, controller.getAllChores);
router.get("/chore/:id", auth, controller.getChore);
router.post("/chore", auth, controller.createChore);

module.exports = router;
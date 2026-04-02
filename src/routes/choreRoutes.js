const express = require("express");

const auth = require("../middlewares/auth.js");
const validateId = require("../middlewares/validateId.js");
const validateDate = require("../middlewares/validateDate.js");
const controller = require("../controllers/choreController.js");

const router = express.Router();

router.get("/chore", auth, controller.getAllChores);
router.get("/chore/:id", auth, validateId, controller.getChore);
router.post("/chore", auth, controller.createChore);
router.put("/chore/:id", auth, validateId, controller.updateChore);
router.delete("/chore/:id", auth, validateId, controller.deleteChore);

router.post("/chore/:id/completedDays/:date", auth, validateId, validateDate, controller.addCompletedDay);
router.delete("/chore/:id/completedDays/:date", auth, validateId, validateDate, controller.removeCompletedDay);

module.exports = router;
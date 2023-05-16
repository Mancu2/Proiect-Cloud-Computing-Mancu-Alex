const express = require("express");
const router = express.Router();
const noteController = require("../controllers").note;

router.post("/", noteController.addNote);
router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNoteById);
router.delete("/:id", noteController.deleteOneNote);
router.put("/:id", noteController.updateNote);

module.exports = router;

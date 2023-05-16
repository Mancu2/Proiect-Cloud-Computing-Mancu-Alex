const express = require("express");
const router = express.Router();
const subjectController = require("../controllers").subject;

router.post("/", subjectController.addSubject);
router.get("/", subjectController.getAllSubjects);
router.get("/:id", subjectController.getSubjectById);
router.delete("/:id", subjectController.deleteOneSubject);

module.exports = router;

const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const subjectRouter = require("./subject");
const noteRouter = require("./note");
const groupRouter = require("./group");
const otherRouter = require("./other");

router.use("/users", userRouter);
router.use("/subjects", subjectRouter);
router.use("/notes", noteRouter);
router.use("/groups", groupRouter);
router.use("/others", otherRouter);

module.exports = router;

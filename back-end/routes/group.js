const express = require("express");
const router = express.Router();
const groupController = require("../controllers").group;

router.post("/", groupController.addGroup);
router.get("/", groupController.getAllGroups);
router.get("/:id", groupController.getGroupById);
router.delete("/:id", groupController.deleteOneGroup);

module.exports = router;

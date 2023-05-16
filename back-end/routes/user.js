const express = require("express");
const router = express.Router();
const userController = require("../controllers").user;

router.post("/login", userController.userAuth);
router.get("/", userController.getAllUsers);

module.exports = router;

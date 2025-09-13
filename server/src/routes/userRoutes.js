const express = require("express")
const userController = require("../controllers/userController")
// const authenticateToken = require("../middleware/auth")
const router = express.Router()

router.post("/login", userController.createUser);

module.exports = router;
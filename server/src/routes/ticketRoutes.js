const express = require("express")
const ticketController = require("../controllers/ticketController")
const authenticateToken = require("../middleware/auth")
const router = express.Router()

router.post("/", authenticateToken, ticketController.createTicket);
router.get("/",authenticateToken, ticketController.getTickets);
router.delete("/delete/:id",authenticateToken, ticketController.deleteTicket);

module.exports = router;
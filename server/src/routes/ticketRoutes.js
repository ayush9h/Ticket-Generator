const express = require("express")
const ticketController = require("../controllers/ticketController")

const router = express.Router()

router.post("/", ticketController.createTicket);
router.get("/",ticketController.getTickets);
router.delete("/delete/:id",ticketController.deleteTicket);

module.exports = router;
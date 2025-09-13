const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);

    req.io.emit("ticketCreated", ticket)

    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error while creating the ticket" });
  }
};

exports.getTickets = async (req, res) => {
  let {page = 1, limit = 3} = req.query

  page = parseInt(page)
  limit = parseInt(limit)

  const skip = (page - 1) * limit

  const totalDocs = await Ticket.countDocuments()
  const totalPages = Math.ceil(totalDocs / limit);

  try {
    const tickets = await Ticket.find()
    .sort({createdAt:-1})
    .skip(skip)
    .limit(limit)
    ;
    res.json({
      page,
      limit,
      totalDocs,
      totalPages,
      tickets:tickets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error while fetching the tickets" });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    
    req.io.emit("ticketDeleted", {id: req.params.id})
    
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occurred while deleting the ticket" });
  }
};

const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

const prisma = new PrismaClient();

app.use(bodyParser.json());
app.post("/api/tickets", async (req, res) => {
  const {
    shopName,
    safetyIssue,
    prodTarget,
    prodActual,
    affectedDnTime,
    grossDnTime,
    majorBreakdown,
    employeeId,
    employeeName
  } = req.body;

  try {
    const ticket = await prisma.ticket.create({
      data: {
        shopName,
        safetyIssue,
        prodTarget,
        prodActual,
        affectedDnTime,
        grossDnTime,
        majorBreakdown,
        employeeId,
        employeeName
      },
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the ticket." });
  }
});

app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany();
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching tickets." });
  }
});

app.delete("/api/tickets/delete/:id", async(req,res)=>{
  const {id} = req.params
  console.log(id)
  try{
    const ticket = await prisma.ticket.delete({
      where:{
        id: parseInt(id),
      },
    });

    res.status(200).json({message:"Ticket deleted successfully",ticket})
  }
  catch(error){
    console.error(error);
    res.status(500).json({error: "An error occurred while deleting the ticket"})
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

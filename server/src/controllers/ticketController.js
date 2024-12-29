const prisma = require("../prisma/client")

exports.createTicket = async(req,res) =>{
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

    try{
        const ticket = await prisma.ticket.create({
            data:{
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

        res.status(201).json(ticket)
    }catch(error){
        console.error(error)
        res.status(500).json({error:"There was an error while creating the ticket"})
    }
};

exports.getTickets = async(req,res)=>{
    try{
        const tickets = await prisma.ticket.findMany();
        res.json(tickets)
    }catch(error){
        console.error(error)
        res.status(500).json({error:"There was an error while fetching the tickets"})
    }
}

exports.deleteTicket = async(req,res)=>{
    const {id} = req.params;
    try{
        const ticket = await prisma.ticket.delete({
            where:{
                id:parseInt(id),
            }
        });
        res.status(200).json({message:"Ticket deleted successfully"},ticket)
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:"Error occurred while deleting the ticket"})
    }
}
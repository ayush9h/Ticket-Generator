const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const http = require("http")
const {Server} = require("socket.io")
const ticketRoutes = require("./routes/ticketRoutes")
const userRoutes = require("./routes/userRoutes")
const connectDB = require("./config/mongoose")

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["POST", "GET", "DELETE"]
    }
})

app.use(cors());
app.use(bodyParser.json());


connectDB()


app.use((req,res,next)=>{
    req.io = io
    next()
})
app.use("/api/tickets", ticketRoutes)
app.use("/api/user", userRoutes)
module.exports = {app,server};
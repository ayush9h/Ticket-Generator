const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const ticketRoutes = require("./routes/ticketRoutes")
const userRoutes = require("./routes/userRoutes")
const connectDB = require("./config/mongoose")

const app = express()

app.use(cors());
app.use(bodyParser.json());


connectDB()

app.use("/api/tickets", ticketRoutes)
app.use("/api/user", userRoutes)
module.exports = app;
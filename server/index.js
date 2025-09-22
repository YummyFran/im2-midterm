require('dotenv').config();

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const api = require("./api")

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api", api)

app.listen(8000, ()=> console.log("runnin on port 8000"))
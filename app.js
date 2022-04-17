const express = require('express')
const app = express()
// Import Helper Methods
const helperMethods = require('./helperMethods')

const firstEndpoint = require("./routes/firstEnd")
app.use("/countries", firstEndpoint)

const secondEndpoint = require("./routes/secondEnd")
app.use("/salesrep", secondEndpoint)

const thirdEndpoint = require("./routes/thirdEnd")
app.use("/optimal", thirdEndpoint)

app.listen(3000)
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Import Country Model
const Country = require('./models/Country')
//Import Connection String
const dbString = require('./connectionString')
// Import Helper Methods
const helperMethods = require('./helperMethods')

var allCountries = []
var allRegions = {}
var salesRep = []
var allMinPeopleCounts = []
var optimal = []

try {
    mongoose.connect(dbString.connstr)
} catch (error) {
    console.error('Error while trying to connect DB!')
}

try {
    Country.find().then( countries => 
        helperMethods.fillAllCountries(countries)
    )    
} catch (err) {
    console.log(err)
}

const firstEndpoint = require("./routes/firstEnd")
app.use("/countries", firstEndpoint)

const secondEndpoint = require("./routes/secondEnd")
app.use("/salesrep", secondEndpoint)

const thirdEndpoint = require("./routes/thirdEnd")
app.use("/optimal", thirdEndpoint)

app.listen(3000)

exports.allCountries = allCountries
exports.allRegions = allRegions
exports.salesRep = salesRep
exports.allMinPeopleCounts = allMinPeopleCounts
exports.optimal = optimal
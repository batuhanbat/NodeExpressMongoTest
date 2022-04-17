const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Import Country Model
const Country = require('./models/Country')
//Import Connection String
const dbString = require('./connectionString')

var allCountries = []
var allRegions = {}
var salesRep = []
var allMinPeopleCounts = []
var optimal = []

function connectToDb() {
    try {
        mongoose.connect(dbString.connstr)
    } catch (error) {
        console.error('Error while trying to connect DB!')
    }
}
//connect to db
connectToDb()

Country.find({}).then((countries) => {
    countries.forEach(
        country => { 
            if (country.name !== undefined && country.name !== null && country.name !== '') {
                if (country.region !== undefined && country.region !== null && country.region !== '') {
                    allCountries.push({"name":country.name, "region":country.region})
                }
            }                         
        }
    )

    countries.forEach(
        country => {
            if (allRegions.hasOwnProperty(country.region)){
                allRegions[country.region] += 1
            } else{
                allRegions[country.region] = 1
            }
        }
    )      

    keysList = Object.keys(allRegions)
    keysList.forEach(
        key => {
            toPush = {}
            toPush["region"] = key
            toPush["minSalesReq"] = Math.ceil(allRegions[key] / 7) 
            toPush["maxSalesReq"] = Math.ceil(allRegions[key] / 3) 
            salesRep.push(toPush)
            
            helper={}
            countriesOfRegion = []
            helper["region"] = key
            for(i in countries){
                if (countries[i]["region"] === key){
                    countriesOfRegion.push(countries[i]["name"])
                }
            }
            
            toAdd = []
            i=0
            while (i<Math.ceil(allRegions[key] / 7)){
                toAdd.push([])
                i += 1
            }

            for (c in countriesOfRegion){
                toAdd[c % toAdd.length].push(countriesOfRegion[c])
            }

            helper["countryLists"] = toAdd            
            allMinPeopleCounts.push(helper)

            for (r in allMinPeopleCounts){
                var listoflists = allMinPeopleCounts[r]["countryLists"]
                for (e in listoflists){
                    mydoc = {}
                    mydoc["region"] = allMinPeopleCounts[r]["region"]
                    mydoc["countryList"] = listoflists[e]
                    mydoc["countryCount"] = listoflists[e].length
                    optimal.push(mydoc)
                }
            }            
        }
    )
}).catch( (e) => {
    console.log(e)
})

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
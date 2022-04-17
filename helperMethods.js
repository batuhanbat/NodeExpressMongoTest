const mongoose = require('mongoose')
//Import Connection String
const dbString = require('./connectionString')
// Import Country Model
const Country = require('./models/Country')

var allCountries = []
var allRegions = {}
var salesRep = []
var allMinPeopleCounts = []
var optimal = []

// connects to db
var connectToDB = function connectToDB() { 
    try {
        mongoose.connect(dbString.connstr, {useNewUrlParser:true})
    } catch (error) {
        console.error('Error while trying to connect DB!')
    }
}

// with the docs of db call fillAllCountries and make allCountries and allRegions get filled from db
var fillAll = function fillAll() {
    try {
        Country.find().then( countries => 
            fillAllCountries(countries)
        )    
    } catch (err) {
        console.log(err)
    }
}

// fills allCountries and allRegions from parameter, also fill salesrep and optimal with countries
var fillAllCountries = function fillAllCountries(countries) {
    countries.forEach(
        country => { 
            if (country.name !== undefined && country.name !== null && country.name !== '') {
                if (country.region !== undefined && country.region !== null && country.region !== '') {
                    allCountries.push({"name":country.name, "region":country.region})
                }
                if (allRegions.hasOwnProperty(country.region)){
                    allRegions[country.region] += 1
                } else{
                    allRegions[country.region] = 1
                }
            }                         
        }
    )

    fillSalesRep()

    fillOptimal(countries)

}

// fills salesRep from allRegions
var fillSalesRep = function fillSalesRep() {
    keysList = Object.keys(allRegions)
    keysList.forEach(
        key => {
            toPush = {}
            toPush["region"] = key
            toPush["minSalesReq"] = Math.ceil((allRegions[key] / 7))
            toPush["maxSalesReq"] = Math.ceil((allRegions[key] / 3))
            salesRep.push(toPush)
        } 
    )  
}

// fill optimal 
var fillOptimal = function fillOptimal(countries) {
    keysList = Object.keys(allRegions)
    keysList.forEach(
        key => { 
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
}

exports.allCountries = allCountries
exports.allRegions = allRegions
exports.salesRep = salesRep
exports.allMinPeopleCounts = allMinPeopleCounts
exports.optimal = optimal

exports.connectToDB = connectToDB
exports.fillAll = fillAll
exports.fillAllCountries = fillAllCountries
exports.fillSalesRep = fillSalesRep
exports.fillOptimal = fillOptimal
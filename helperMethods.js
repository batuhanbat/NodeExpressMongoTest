const mongoose = require('mongoose')
//Import Connection String
const dbString = require('./connectionString')
// Import Country Model
const Country = require('./models/Country')

var allCountries = []

// connects to db
var connectToDB = function connectToDB() { 
    return new Promise((resolve, reject) => {
        try {
            mongoose.connect(dbString.connstr, {useNewUrlParser:true})
            resolve("db conn +")
        } catch (error) {
            console.log('Error while trying to connect DB!')
            reject("db conn -")
        }   
    })      
}

// with the docs of db fill allCountries
var fillFromDb = function fillFromDb() {   
    return new Promise((resolve, reject) => {
        try {
            Country.find().then( countries => {
                fillCountries(countries)
            resolve("fill from db +")
            })  
        } catch (error) {
            console.log('Error while trying to fill from DB!')
            reject("fill from db -")
        }
    })
       
}

// first connects to db then fills allCountries with the docs of db 
var handler = async function handler() {
    try{
        var a = await connectToDB()
        var b = await fillFromDb()
    } catch (err) {
        console.log(err)
    }      
}

// fill allCountries 
var fillCountries = (countries) => {
    countries.forEach(
        country => { 
            if (country.name !== undefined && country.name !== null && country.name !== '') {
                if (country.region !== undefined && country.region !== null && country.region !== '') {
                    if (!allCountries.some(c => c.name === country.name && c.region === country.region) ) {
                        allCountries.push({"name":country.name, "region":country.region})                        
                    }                                       
                }                
            }                         
        }
    )
}

// create and return allRegions
var fillRegions = (countries) => {
    var allRegions = {}
    for (i in countries) {
        var country = countries[i]
        
        if (allRegions.hasOwnProperty(country.region)) {
            allRegions[country.region] += 1
        } else {
            allRegions[country.region] = 1
        }
    } 
    return allRegions
}

// create and return salesRep
var fillSalesRep = (allRegions) => {
    var salesRep = []
    keysList = Object.keys(allRegions)
    keysList.forEach(
        key => {
            toPush = {}
            toPush["region"] = key
            toPush["minSalesReq"] = Math.ceil((allRegions[key] / 7))
            toPush["maxSalesReq"] = Math.ceil((allRegions[key] / 3))
            if (!salesRep.some(s => s.region === toPush.region && s.minSalesReq === toPush.minSalesReq && s.maxSalesReq === toPush.maxSalesReq)) {
                salesRep.push(toPush)
            }
        }
    )
    return salesRep
}

// create and return optimal
var fillOptimal = function fillOptimal(allRegions) {
    var optimal = []
    keysList = Object.keys(allRegions)    
    keysList.forEach(
        key => {             
            helper={}
            var countriesOfRegion = []
            helper["region"] = key
            for(i in allCountries){
                if (allCountries[i]["region"] === key){
                    countriesOfRegion.push(allCountries[i]["name"])
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
            var allMinPeopleCounts = []             
            if (!allMinPeopleCounts.some(a => a.region === helper.region)){
                allMinPeopleCounts.push(helper)
            }            

            for (r in allMinPeopleCounts){
                var listoflists = allMinPeopleCounts[r]["countryLists"]
                for (e in listoflists){
                    mydoc = {}
                    mydoc["region"] = allMinPeopleCounts[r]["region"]
                    mydoc["countryList"] = listoflists[e]
                    mydoc["countryCount"] = listoflists[e].length
                    if (!optimal.some(o => o.region === mydoc.region && o.countryList === mydoc.countryList && o.countryCount === mydoc.countryCount) ) {
                        optimal.push(mydoc)
                    }                    
                }
            }            
        }
    )
    return optimal
}

exports.allCountries = allCountries

exports.connectToDB = connectToDB
exports.fillFromDb = fillFromDb
exports.fillCountries = fillCountries
exports.fillRegions = fillRegions
exports.fillSalesRep = fillSalesRep
exports.fillOptimal = fillOptimal
exports.handler = handler
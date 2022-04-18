const mongoose = require('mongoose')
//Import Connection String
const dbString = require('./connectionString')
// Import Country Model
const Country = require('./models/Country')

var allCountries = []
var allRegions = {}
var salesRep = []
var optimal = []
var allMinPeopleCounts = []

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

// with the docs of db fill allCountries and allRegions
var fillFromDb = function fillFromDb() {   
    return new Promise((resolve, reject) => {
        try {
            Country.find().then( countries => {
                fillCountriesAndRegions(countries)
            resolve("fill from db +")
            })  
        } catch (error) {
            console.log('Error while trying to fill from DB!')
            reject("fill from db -")
        }
    })
       
}

var handler = async function handler() {
    try{
        var a = await connectToDB()
        var b = await fillFromDb()
    }catch (err) {
        console.log(err)
    }      
}

// fill allCountries and allRegions
var fillCountriesAndRegions = function fillCountriesAndRegions(countries) {
    countries.forEach(
        country => { 
            if (country.name !== undefined && country.name !== null && country.name !== '') {
                if (country.region !== undefined && country.region !== null && country.region !== '') {
                    if (!allCountries.some(c => c.name === country.name && c.region === country.region) ) {
                        allCountries.push({"name":country.name, "region":country.region})                        
                        if (allRegions.hasOwnProperty(country.region)){
                            allRegions[country.region] += 1
                        } else{
                            allRegions[country.region] = 1
                        } 
                    }                                       
                }                
            }                         
        }
    )
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
            if (!salesRep.some(s => s.region === toPush.region && s.minSalesReq === toPush.minSalesReq && s.maxSalesReq === toPush.maxSalesReq) ) {
                salesRep.push(toPush)
            }            
        } 
    )  
}

// fill optimal from allCountries and allRegions
var fillOptimal = function fillOptimal() {
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
}

exports.allCountries = allCountries
exports.allRegions = allRegions
exports.salesRep = salesRep
exports.optimal = optimal

exports.connectToDB = connectToDB
exports.fillFromDb = fillFromDb
exports.fillCountriesAndRegions = fillCountriesAndRegions
exports.fillSalesRep = fillSalesRep
exports.fillOptimal = fillOptimal
exports.handler = handler
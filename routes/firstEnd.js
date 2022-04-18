const express = require("express")
let router = express.Router()
const helperMethods = require("../helperMethods")

// 1st endpoint
router.get('/', function (req,res){
    try{
        helperMethods.connectToDB()
        helperMethods.fillFromDb()
    } catch(err) {
        console.log(err)
    }    
    try {
        let param = req.query
        if (Object.keys(param).length !== 0) {
            if (param["region"] !== undefined && param["region"] !== null && param["region"] !== "") {
                var regionParam = param["region"]
                toSend = {}
                toSend["region"] = regionParam
                countriesInRegion = []
                helperMethods.allCountries.forEach(
                    country => {
                        if (country["region"] === regionParam) {
                            countriesInRegion.push(country["name"])
                        }
                    }
                )
                toSend["countryCountInRegion"] = countriesInRegion.length
                toSend["countryList"] = countriesInRegion
                if (countriesInRegion.length === 0) {
                    res.send("No such region name exists in DB! You must provide param value without any string quotes and also case sensitive.")
                } else {
                    res.send(toSend)
                }            
            } else {
                res.send("This endpoint can only process query param named region !")
            }  
        } else {
            res.send(helperMethods.allCountries)
        }
    } catch (err) {
        console.log(err)
    }         
})

module.exports = router
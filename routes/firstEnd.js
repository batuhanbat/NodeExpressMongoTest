const express = require("express")
let router = express.Router()
const app = require("../app")

// 1st endpoint
router.get('/', (req,res) => {
    let param = req.query
    if (Object.keys(param).length !== 0) {
        if (param["region"] !== undefined && param["region"] !== null && param["region"] !== "") {
            var regionParam = param["region"]
            toSend = {}
            toSend["region"] = regionParam
            countriesInRegion = []
            app.allCountries.forEach(
                country => {
                    if (country["region"] === regionParam) {
                        countriesInRegion.push(country["name"])
                    }
                }
            )
            toSend["countryCountInRegion"] = countriesInRegion.length
            toSend["countryList"] = countriesInRegion
            if (countriesInRegion.length === 0) {
                res.send("No such region name exists in DB ! You may want to provide param value without any string quotes. Also note that the param value is case sensitive.")
            } else {
                res.send(toSend)
            }            
        } else {
            res.send("This endpoint can only process query param named region !")
        }  
    } else {
        res.send(app.allCountries)
    }     
})

module.exports = router
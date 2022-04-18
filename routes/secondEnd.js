const express = require("express")
let router = express.Router()
const helperMethods = require("../helperMethods")
const axios = require('axios')

const makeGetReq = async () => {
    try {
        return await axios.get("http://127.0.0.1:3000/countries").then(response => response.data)
    } catch (error) {
        console.error(error)
    }
}

// 2nd endpoint
router.get( '/', async function (req,res) {        
    try {
        var resp = await makeGetReq()
        var regions = helperMethods.fillRegions(resp) 
        var salesreps = helperMethods.fillSalesRep(regions)    
        res.send(salesreps)
    } catch (err) {
        console.log(err)
    }    
})

module.exports = router
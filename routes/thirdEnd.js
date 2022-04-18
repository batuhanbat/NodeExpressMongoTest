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

// 3rd endpoint
router.get( '/', async function (req,res) {    
    try {
        var resp = await makeGetReq()
        var regions = helperMethods.fillRegions(resp)
        var optimals = helperMethods.fillOptimal(regions)
        res.send(optimals)
    } catch (err) {
        console.log(err)
    }    
})

module.exports = router
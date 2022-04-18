const express = require("express")
let router = express.Router()
const helperMethods = require("../helperMethods")
const axios = require('axios')

const makeGetReq = async () => {
    try {
        return await axios.get("http://127.0.0.1:3000/countries")
    } catch (error) {
        console.error(error)
    }
}

const waitResp = async () => {
    const resp = await makeGetReq()
    return resp
}

// 2nd endpoint
router.get( '/', async function (req,res) {
    var resp = await waitResp()
    try {
        helperMethods.fillSalesRep()
        res.send(helperMethods.salesRep)
    } catch (err) {
        console.log(err)
    }    
})

module.exports = router
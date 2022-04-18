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
}

// 3rd endpoint
router.get( '/', async function (req,res) {
    var a = await waitResp()
    try {
        helperMethods.fillOptimal()
        res.send(helperMethods.optimal)
    } catch (err) {
        console.log(err)
    }    
})

module.exports = router
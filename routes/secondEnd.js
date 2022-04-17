const express = require("express")
let router = express.Router()
const helperMethods = require("../helperMethods")
const http = require('http')
const options = {
    host: '127.0.0.1',
    port: 3000,
    path: '/countries',
    method: 'GET'
}  

// 2nd endpoint
router.get( '/', (req,res) => {
    const requ = http.request(options)
    requ.on('error', error => {
        console.error(error)    
    })
    requ.end()
    helperMethods.fillSalesRep()
    res.send(helperMethods.salesRep)
})

module.exports = router
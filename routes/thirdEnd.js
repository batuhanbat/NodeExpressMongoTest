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

// 3rd endpoint
router.get( '/', async function(req,res) {
    try {
        const requ = http.request(options)
        requ.on('error', error => {
            console.error(error)    
        })
        requ.end()
        //await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
        console.log(err)
    }
    try {
        helperMethods.fillOptimal()
        res.send(helperMethods.optimal)
    } catch (err) {
        console.log(err)
    }    
})

module.exports = router
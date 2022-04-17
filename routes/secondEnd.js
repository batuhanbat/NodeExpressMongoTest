const express = require("express")
let router = express.Router()
const helperMethods = require("../helperMethods")

// 2nd endpoint
router.get( '/', (req,res) => {
    helperMethods.fillSalesRep()
    res.send(helperMethods.salesRep)
})

module.exports = router
const express = require("express")
let router = express.Router()
const helperMethods = require("../helperMethods")

// 3rd endpoint
router.get( '/', (req,res) => {
    helperMethods.fillOptimal()
    res.send(helperMethods.optimal)
})

module.exports = router
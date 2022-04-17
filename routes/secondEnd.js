const express = require("express")
let router = express.Router()
const app = require("../helperMethods")

// 2nd endpoint
router.get( '/', (req,res) => 
    res.send(app.salesRep)
)

module.exports = router
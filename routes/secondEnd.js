const express = require("express")
let router = express.Router()
const app = require("../app")

// 2nd endpoint
router.get( '/', (req,res) => 
    res.send(app.salesRep)
)

module.exports = router
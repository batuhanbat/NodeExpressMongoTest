const express = require("express")
let router = express.Router()
const app = require("../helperMethods")

// 3rd endpoint
router.get( '/', (req,res) => 
    res.send(app.optimal)
)

module.exports = router
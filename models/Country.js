const mongoose = require('mongoose')

// schema and model setup
const countrySchema = new mongoose.Schema({
    name: {type:String},
    region: {type:String}
})

module.exports = mongoose.model('Country', countrySchema)
'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CarSchema = new Schema({
    plateNumber: {
        type: String,
        Required: 'Please enter'
    },
    carBrand: {
        type: String,
        Required: 'Please enter'
    },
    carModel: {
        type: String,
        Required: 'Please enter'
    },
    remark:{
        type: String,
        Required: 'Please enter'
    },
    createdDate:{
        type: String,
        default :Date.now
    }
})

module.exports = mongoose.model('Car', CarSchema)

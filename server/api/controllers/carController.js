'use strict'
var mongoose = require('mongoose')
Car = mongoose.model('Car')

exports.listAllCar = function(req, res){
    var query = { sort: { createdDate: 1 } }
    Car.find({}, null, query, function(err, car){
        if(err) throw err
        res.json(car)
    })
}

exports.createCar = function(req, res){
    var newCar = new Car(req.body)
    newCar.save(function(err, car){
        if(err) throw err
        res.json(car)
    })
}

exports.readCar = function(req, res){
    Car.findById(req.params.carId, function(err, car){
        if(err) throw err
        
        res.json(car)
    })
}

exports.deleteCar = function(req, res){
    Car.findByIdAndRemove(req.params.carId, function(err, car){
        if(err) throw err
        const response = {
            message: "Delete car id: "+ req.params.carId +" successfully",
            id: car._id
        }
        res.json(response)
    })
}

exports.updateCar = function(req, res){
    var newCar = {}
    newCar = req.body
    
    Car.findByIdAndUpdate(req.params.carId, newCar, {new: true}, function(err, car){
        if(err) throw err
        
        res.json(car)
    })
}
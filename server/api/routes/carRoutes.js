'use strict'
module.exports = function(app){
    var carList = require('../controllers/carController')

    app.route('/cars')
        .get(carList.listAllCar)
        .post(carList.createCar)

    app.route('/cars/:carId')
        .get(carList.readCar)
        .delete(carList.deleteCar)
        .post(carList.updateCar)
}
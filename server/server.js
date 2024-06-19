var express = require('express')
var cors = require('cors')

app = express()
app.use(cors())

port = process.env.PORT || 3456
mongoose = require('mongoose')
Car = require('./api/models/carModel')
bodyParser = require('body-parser')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Cardb', function(error){
    if(error) throw error
    console.log('Successfully connected');
})

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

var routes = require('./api/routes/carRoutes')
routes(app)

app.listen(port)

console.log('Car List started on : '+ port)


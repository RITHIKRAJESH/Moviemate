const express=require('express')
const { registerTheater, viewBooking } = require('../controls/theaterControl')


const theaterRouter=express.Router()



theaterRouter.route("/register").post(registerTheater)
theaterRouter.route("/view-booking").get(viewBooking)


module.exports=theaterRouter
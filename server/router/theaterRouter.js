const express=require('express')
const { registerTheater, viewBooking, theaterLogin, viewProfile, removeMovie, addMovie } = require('../controls/theaterControl')


const theaterRouter=express.Router()



theaterRouter.route("/register").post(registerTheater)
theaterRouter.route("/view-booking").get(viewBooking)
theaterRouter.route("/theaterlogin").post(theaterLogin)
theaterRouter.route("/viewProfile").get(viewProfile)
theaterRouter.route("/removeMovie").post(removeMovie)
theaterRouter.route("/addMovie").post(addMovie)

module.exports=theaterRouter


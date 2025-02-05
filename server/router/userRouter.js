const express=require('express')
const { loginUser, verifyOtp, userViewmovie, userBookTickets, getUserByEmail, useraddtickets, fetchBookedTicket, Viewmovie } = require('../controls/userControl')


const userRouter=express.Router()


userRouter.route("/login").post(loginUser)
userRouter.route("/verify").post(verifyOtp)
userRouter.route("/viewmovie").get(userViewmovie)
userRouter.route("/viewtheater/:id").get(userBookTickets)
userRouter.route("/getUserByEmail").get(getUserByEmail)
userRouter.route("/bookTickets").post(useraddtickets)
userRouter.route("/fetchbooked").get(fetchBookedTicket)
userRouter.route("/movie/:id").get(Viewmovie)
module.exports=userRouter
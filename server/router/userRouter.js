const express=require('express')
const { loginUser, verifyOtp, userViewmovie, userBookTickets, getUserByEmail } = require('../controls/userControl')

const userRouter=express.Router()


userRouter.route("/login").post(loginUser)
userRouter.route("/verify").post(verifyOtp)
userRouter.route("/viewmovie").get(userViewmovie)
userRouter.route("/viewtheater/:id").get(userBookTickets)
userRouter.route("/getUserByEmail").get(getUserByEmail)
module.exports=userRouter
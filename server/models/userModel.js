const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    otp:{type:String},
    verify:{type:Boolean,default:false}
},{timestamps:true})

const userModel=new mongoose.model("user",userSchema)

module.exports=userModel
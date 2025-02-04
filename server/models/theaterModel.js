const mongoose=require('mongoose')

const theaterSchema=new mongoose.Schema({
    name:{type:String},
    license:{type:String},
    email:{type:String},
    place:{type:String},
    movies:{type:Array},
    password:{type:String}
},{timestamps:true})

const theaterModel=new mongoose.model("theater",theaterSchema)

module.exports=theaterModel
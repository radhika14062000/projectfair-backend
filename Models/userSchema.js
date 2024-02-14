const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
 username:{
    type:String,
    require:true
 },
 email:{
  type:String,
  require:true,
  unique:true
 },
 password:{
  type:String,
  require:true
 },
 github:{
  type:String,
  
 },
 link:{
  type:String,
  
 },
 profile:{
  type:String,
 
 }
})


const users=mongoose.model("user",userSchema)
module.exports=users   //model
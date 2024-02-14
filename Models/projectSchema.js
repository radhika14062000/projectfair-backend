const mongoose = require('mongoose')

const projectschema=new mongoose.Schema({
 title:{
  type:String,
  requires:true
 },
 language:{
  type:String,
  requires:true
 },
 github:{
  type:String,
  requires:true
 },
 link:{
  type:String,
  requires:true
 },
 overview:{
  type:String,
  requires:true
 },
projectImage:{
  type:String,
  requires:true
 },
userId:{
  type:String,
  requires:true
 }
})

const projects=mongoose.model("projects",projectschema)
module.exports=projects
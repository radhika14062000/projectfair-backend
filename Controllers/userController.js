const users=require('../Models/userSchema')


//import jwt token
const jwt=require('jsonwebtoken')

//register logic
exports.register=async(req,res)=>{
 console.log("inside register function");

const{username,email,password}=req.body
try{
const existingUser= await users.findOne({email})
if(existingUser){
 res.status(401).json("user already regesterd")
}
else{
 const newUser=await users({
  username,email,password,github:"",link:"",profile:""
 })
 await newUser.save()
 res.status(200).json("user registration successful")
}
}
catch(err){

 res.status(500).json("server error" +err.message)
}
}

//login logic
exports.login=async(req,res)=>{
 console.log("inside login function");
const{email,password}=req.body
 
 try{
  const Userlogin=await users.findOne({email,password})
  if(Userlogin){
   //token generation
   const token=jwt.sign({userId:Userlogin._id},"superkey2024")
   console.log(token);
   res.status(200).json({Userlogin,token}) //response
   
  }
  else{
   res.status(401).json("invalid login")
  }
 }
 catch(err){
  res.status(500).json("server error"+err.message)
 }
 console.log(`${email} ${password}`);
}

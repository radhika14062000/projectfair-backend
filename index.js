//loads .env ile into process.env
require('dotenv').config() //loads .env file contents into process.env by default

//import express
const express=require('express')

//import cors
const cors=require('cors') 

const db=require('./DB/connection')

const router = require('./Router/route')

// const router = require("./Middlewares/appMiddleware")
const appMidleware = require('./Middlewares/appMiddleware')

const jwtMiddleware = require('./Middlewares/jwtMiddleware')
//create a backend application using express
const pfServer=express()

//use
pfServer.use(cors())
pfServer.use(express.json()) //returns middleware that only parses json
// pfServer.use(appMidleware)
pfServer.use(router)  
pfServer.use('/uploads',express.static('./uploads')) //to export mage from server to client


//port creation
const PORT=process.env.PORT || 4000

//server listen
pfServer.listen(PORT,()=>{
 console.log('listening on port' +PORT);
})

//http-get resolving to http://localhost4000
pfServer.get("/",(req,res)=>{
 res.send(`<h1>Project Fair Is Started...</h1>`)
})
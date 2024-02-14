const projects=require('../Models/projectSchema')

//add project logic

exports.addUserProject=async(req,res)=>{
 console.log("inside addUserProject");
 // res.status(200).json("add user project request")
 //user id get
 const userId=req.payload
 // //get add project details
 const{title,language,github,link,overview}=req.body
 // //get the image
  projectImage=req.file.filename
  console.log(projectImage);
 // //logic of adding new user project
 try{
 const existingProject=await projects.findOne({github})
 if(existingProject){
  res.status(406).json("project already exist")
 }
 else{
  const newProject=new projects({title,language,github,link,overview,projectImage,userId})
  await newProject.save()
  res.status(200).json(newProject)
 }
 }
 catch(err){
  res.status(404).json({message:err,message})
 }
}

//1 get user project
exports.getUserProject=async(req,res)=>{
 //get user id
 const userId=req.payload
 //api request
 try{
   //get project information to particular user
   const userProject=await projects.find({userId})
   console.log(userProject);
   res.status(200).json(userProject)
 }
 catch(err){
 res.status(401).json(err.message)
 }
}

//2 get all projects
exports.getAllProjects=async(req,res)=>{
  const searchKey=req.query.search
  const query={
    language:{
      $regex:searchKey,
      $options:"i"
    }
  }
 try{
  const AllProjects=await projects.find(query)
   res.status(200).json(AllProjects)
 }
 catch(err){
  res.status(401).json(err.message)
 }
}

//3 get home project
exports.getHomeProject=async(req,res)=>{
 try{
  const HomeProject=await projects.find().limit(3)
  res.status(200).json(HomeProject) //send response to client
 }
 catch(err){
  res.status(401).json(err.message)
 }
}

//4 edit project details
exports.editProject=async(req,res)=>{
 const{title,language,github,link,overview,projectImage}=req.body

 const uploadImage=req.file?req.file.filename:projectImage

 const userId=req.payload

 const {id}=req.params

 try{
  //find the particular project id in mongodb and add the updated project details
  const updateProject=await projects.findByIdAndUpdate({_id:id},{title,language,github,link,overview,projectImage:uploadImage,userId},{new:true})

  //save updated details
  await updateProject.save()
  //response send back to the client
  res.status(200).json(updateProject)
 }
 catch(err){
  res.status(401).json(err)
 }
}

//5 delete the project details
exports.deleteProject=async(req,res)=>{
  const {pid}=req.params
  try{
    const deleteData=await projects.findByIdAndDelete({_id:pid})
    res.status(200).json(deleteData)
  }
  catch(err){
    res.status(401).json(err)
  }
}
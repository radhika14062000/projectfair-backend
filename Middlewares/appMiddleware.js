const appMidleware=(req,res,next)=>{
 console.log("inside the app middleware");
 next()
}
module.exports =appMidleware
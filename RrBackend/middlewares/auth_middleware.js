const jwt = require('jsonwebtoken')
const User = require('../model/user_schema')

const checkUserAuth = async (req,res, next) =>{
let token;
const {authorization} = req.headers;
console.log('Token middleware', req.headers)
if(authorization && authorization.startsWith("Bearer")){
    try{
        token = authorization.split(" ")[1];
        const {userID} = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = await User.findById(userID).select('-password');
        
        next()
    }catch(err){
      res.status(401).send({ success:"failure", error:"Unauthorized User"+ err.message});
    }
}
if(!token){
 res.status(401).send({success:"failure", error : "Unauthorized User no token"})   
}
}
 
module.exports={
    checkUserAuth
}

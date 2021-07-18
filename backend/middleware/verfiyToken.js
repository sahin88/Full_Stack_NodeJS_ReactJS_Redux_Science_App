import jwt from "jsonwebtoken";


const verifyToken=(req, res, next)=>{
    let {sendToken}=req.body
   

    
    const authorizationtoken=sendToken.authorization.split(" ")[2];
    const isCustomAuth=authorizationtoken.length<500

    if (!authorizationtoken){return res.error='Access denied'}
    
    let verified
    if(isCustomAuth && authorizationtoken) {
         verified=jwt.verify(authorizationtoken, 'sahin');
        req.userId=verified.id
    } 
    
    else{
        verified=jwt.decode(authorizationtoken);
        req.userId=verified.sub
    }
    req.body=req.body
    next();

}
export default verifyToken;
const jwt = require('jsonwebtoken');
const JWT_PWD_KEY='adilovesya'

const fetchuser=(req,res,next)=>{
    let token= req.header("auth-token")
    // token=token.slice(1,-1)
    if(!token){
        return res.status(401).send({error: "Access Denied"})
    }
    try {
        const tokendata = jwt.verify(token, JWT_PWD_KEY);
        req.id=tokendata.id;
        next()
    } catch (error) {
        return res.status(500).json({error:error.message})
      }
}

module.exports=fetchuser
const jwt = require('jsonwebtoken') ; 
const{sender , receiver, content} = require('../controller/messageController') ;

try{
    console.log(sender , receiver , content) ; 

}catch(err){
    console.log(err.message) ;
}
// Middleware pour vérifier le token JWT    

const authMiddleware = (req , res ,next)=>{
    const token = req.header('Authorization') ; 
    if(!token)return res.status(401).json({message : 'Accès refusé , token requis'}) ; 
    
    try {
        const verified = jwt.verify(token , 'secret_key') ; 
        req.user = verified ; 
        next() ;
    } catch (error) {
        res.status(400).json({message : 'Token Invalid'})
    }
}
module.exports = authMiddleware ; 
const jwt = require('jsonwebtoken') ; 

exports.authMiddleware = (req , res ,next)=>{
    const token = req.header('Authorization') ; 
    if(!token)return res.status(401).json({message : 'Accès refusé , token requis'}) ; 
    
    try {
        const vérified = jwt.verify(token , 'secret_key')
       next() 
    } catch (error) {
        res.status(400).json({message : 'Token Invalid'})
    }
}
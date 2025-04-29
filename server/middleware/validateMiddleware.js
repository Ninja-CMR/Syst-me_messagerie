const {body , validationResult} = require('express-validator') ;
const {sender , receiver , content} = require('../controller/messageController') ;

try{
    console.log(sender , receiver , content)
}catch(err){
    console.log(err.message) ; 
}

const validateMessage = [body('content').notEmpty().withMessage('Le message ne peut pas être vide') , 
    (req , res , next) =>{
        const errors = validationResult(req) ; 
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()})
        } next() ; 
    }
    
] ; 

module.exports  = validateMessage 
const {body , validationResult} = require('express-validator') ; 
const validateMessage = [body('content').notEmpty().withMessage('Le message ne peut pas être vide') , 
    (req , res , next) =>{
        const errors = validationResult(req) ; 
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()})
        }
    }
] ; 

module.exports  = validateMessage 
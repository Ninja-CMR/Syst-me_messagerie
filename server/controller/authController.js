const bcrypt = require('bcrypt') ; 
const jwt = require('jsonwebtoken') ;
const User = require('../models/user') ;
const {validationResult} = require('express-validator')
require('dotenv').config() ;
const secretKey = process.env.JWT_SECRET;

exports.login = async(req , res ) => {
    try{
        const {email , password} = req.body ;

        //Recherche de l'utilsateur dans la base de donnée
        const user  = await User.findOne({email : email}) ;
        if(!user)return res.status(400).json({message : 'Utilisateur non trouvé'})

        //Vérification du mot de passe 
        const isMatch =  await bcrypt.compare(password , user.password) ;
        if(!isMatch)return res.status(400).json({message : 'Mot de passe incorrect'}) ;

        //Création du token JWT 
        const  token = jwt.sign ({id:user._id} , process.env.JWT_SECRET , {expiresIn : '1h'});
        res.status(200).json({token : token ,
              user: { _id: user._id, username: user.username, email: user.email }
        })
    }catch(error){
        res.status(500).json({error : error.message})
    }
};
exports.register = async(req , res) =>{
    try{
        //Verificaton des erreurs de validation
        const errors = validationResult(req) ; 
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()}) ; 
        } const{username , email , password} = req.body ; 
        //Verifier si l'utilisateur existe déjà 
        let user = await User.findOne({email}) ; 
        if(user)return res.status(400).json({message : 'Utilsateur déjà existant'})
            //Hashage de mot de passe 
        const hashedPassword  = await bcrypt.hash(password , 10) ; 
        //Création  de l'utilsateur 
        user = new User({username ,email , password : hashedPassword}); 
            await user.save() ; 
            //Génération du token 
        const token = jwt.sign({id: user._id} , 'secret_key' , {expiresIn : '1h'})
        res.status(201).json({
            message: 'Inscription réussie',
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    }catch(error){
        res.status(500).json({message : 'Erreur serveur' , error})
    }
}
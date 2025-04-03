//Déclaration des dépendances 

const express = require('express')
const router = express.Router() ;
const {login}  = require('../controller/authController') ;
const {register} = require('../controller/authController')
const {check} = require('express-validator')



//Route pour l'inscription

//Route de connexion avec validation
router.post('/login' , [
    check("email").isEmail().withMessage('Email valide') , 
    check("password").notEmpty().withMessage('Mot de passe requis') , 
] , login) ; 

router.post(
    '/register' , 
    [
        check('username').notEmpty().withMessage("Le nom d'utilisateur est requis") , 
        check('email').isEmail().withMessage('Email invalide') , 
        check('password').isLength({min : 6}).withMessage('Le mot de passe doit contenir au moins 6 caractères'),  

    ] , 
    register) ; 


module.exports = router ;





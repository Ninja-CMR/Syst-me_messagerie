//Déclaration des modules

const express = require('express')
const app  =   express()
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')
const {Server} = require('socket.io')
const dotenv = require('dotenv')
const crypto = require('crypto');
const server = http.createServer(app)
const User  = require("./models/user")
const messageModel = require("./models/messageModels")
const authRoutes = require('./routes/authRoutes')
const messageRoutes = require('./routes/message')


//Middleware des dépendances 
dotenv.config()
console.log('Clé de chiffrement : ' ,process.env.ENCRYPTION_KEY)
app.use(cors())
app.use(express.json())

//Connexion à la base de donnée
mongoose.connect('mongodb://127.0.0.1:27017/messagerie')
.then(()=>console.log('Connexion à la base de donnée réussie')) 
.catch(()=>console.error('Erreur de connexion'))


//Connexion de l'utilisateur 


//Declaration des routes

const io = new Server(server , {
    cors :{
        origin : '*' , 
        methods : ['GET' , 'POST'], 
        allowedHeaders : ['Content-Type'  ,'Authorization']
    }
})


io.on ("connection" , (socket) =>{
    console.log(`Utilisateur connecté ${socket.id}`)
})

//Définition des routes 
app.use('/api/auth' , authRoutes)  ; //Routes pour l'authentification 
/*app.use('/api/message' , messageRoutes) */// Routes pour les messages 

module.exports = app

//Lancement du server 

server.listen(3000 , ()=>{
    console.log('Server is running')
})
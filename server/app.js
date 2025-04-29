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

const io = new Server(server , {
    cors :{
        origin : '*' , 
        methods : ['GET' , 'POST'], 
        allowedHeaders : ['Content-Type'  ,'Authorization']
    }
})

let onlineUsers = [] ; // Tableau pour stocker les utilisateurs en ligne

io.on ("connection" , (socket) =>{
    console.log(`Utilisateur connecté ${socket.id}`)  ; 
    //Quand un utilisateur se connecte, on l'ajoute à la liste des utilisateurs en ligne
    socket.on('userconnected', (username) => {
        console.log(`${username} est en ligne avec l'ID ${socket.id}`);
        onlineUsers.push({ username, socketId: socket.id });
        io.emit('updateOnlineUsers' , onlineUsers); // Met à jour la liste des utilisateurs en ligne pour tous les clients
    })

    socket.on('send_message', async (data) => {
        const { sender, receiver, content } = data;
        const Message = require('./models/messageModels');
      
        const encryptedContent = Message.encryptContent(content);
        const message = new Message({ sender, receiver, content: encryptedContent });
        await message.save();
      
        io.emit('receive_message', {
          sender,
          receiver, 
          content: message.decryptContent(), // Renvoie le message déchiffré au front
        });
      });
     
    socket.on('disconnect' , ()=>{
        console.log('Utilisateur déconnecté' , socket.id) ; 
        //Quand un utilisateur se déconnecte, on le retire de la liste des utilisateurs en ligne
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);

        //Mise à jour de la liste des utilisateurs en ligne pour tous les clients
        io.emit('updateOnlineUsers', onlineUsers);
        })
        
})

//Définition des routes 
app.use('/api/auth' , authRoutes)  ; //Routes pour l'authentification 
app.use('/api/messages' , messageRoutes) /// Routes pour les messages 

module.exports = app

//Lancement du server 

server.listen(3000 , ()=>{
    console.log('Server is running')
})
/*const express  = require('express')
const router = express.Router() ; 
const messageController = require('../controller/messageController') ;
const authMiddleware = require('../middleware/authMiddleware')
const validateMessage = require('../middleware/validateMiddleware')

 
router.post('/send' ,authMiddleware ,validateMessage ,  messageController.sendMessage) ;
router.get('/receive/:userId',authMiddleware ,validateMessage ,   messageController.receiveMessage) ; 

module.exports= router*/
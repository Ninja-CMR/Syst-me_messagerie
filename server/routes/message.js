const express  = require('express')
const router = express.Router() ; 
const {sendMessage , receiveMessage} = require('../controller/messageController') ;
/*const authMiddleware = require('../middleware/authMiddleware')*/
const validateMessage = require('../middleware/validateMiddleware')

 
router.post('/send', validateMessage ,sendMessage) ;
router.get('/receive/:userId' , validateMessage ,  receiveMessage) ; 

module.exports= router
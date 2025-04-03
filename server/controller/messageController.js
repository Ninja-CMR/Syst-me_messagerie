const Message = require('../models/messageModels') ; 
const {encryt , decrypt} = require('../utils/cryto') ;

exports.sendMessage = async(req , res)=>{
    try{
        //Extraction des données du messages depuis le corps de la requête

        const {sender , receiver , content} = req.body ;

        //Chiffrement du message avant enregistrement 
        const{iv, encrypted}  = encrypted(content)  ; 
        const messageContent = {iv , encyptedData}


        //Creation d'un nouveau message 
        const newMessage = new Message({sender ,receiver , content}) ; 
        await newMessage.save(); 

        res.status(201).json({message : 'Message envoyé avec succès ' , data : newMessage})
    }catch(error){
        res.status(500).json({error :error.message })
    }
}

exports.receiveMessage  = async(req , res)=>{

    try{
        //On recupère l'Id de l'utilsateur via les paramètres de l'url
        const {userId} = req.params ; 
        //Recherche des messages addressés à cet utilisateur, triés par date creation
        const messages = await Message.find({receiver  : userId}).sort({createdAt : 1}); 

        //Déchiffrement du message 
        const decryptedMessages = messages.map(msg =>{
            return{
                ...msg._doc, 
                content : decrypt(msg.content.encryptedData , msg.content.iv)
            };
        });
        res.status(201).json(messages)
    }catch(error){
        res.status(500).json({error : error.message})
    }
}


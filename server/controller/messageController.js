const Message = require('../models/messageModels') ; 
const {encrypt , decrypt} = require('../utils/crypto') ;

exports.sendMessage = async (req, res) => {
    try{
        console.log(sender , receiver , content)
    } catch(err){
        console.log(err.message) ; 
    }
    const { sender, receiver, content } = req.body;
  
    if (!sender || !receiver || !content) {
      console.log('❌ Données manquantes :', req.body);
      return res.status(400).json({ error: 'Champs manquants' });
    }
  
    try {
      const { iv, encryptedData } = encrypt(content);
  
      const newMessage = new Message({
        sender,
        receiver,
        content: encryptedData,
        iv
      });
  
      await newMessage.save();
      console.log('✅ Message sauvegardé avec chiffrement');
  
      res.status(201).json({
        message: 'Message envoyé avec succès',
        data: newMessage
      });
    } catch (error) {
      console.log('❌ Erreur lors de l’envoi :', error.message);
      res.status(500).json({ error: error.message });
    }
  };
exports.receiveMessage  = async(req , res)=>{
    const {sender , receiver} = req.query ; 
    try{
            //Recherche des messages addressés à cet utilisateur, triés par date creation
        const messages = await Message.find({sender ,receiver})

        //Déchiffrement du message 
        const decryptedMessages = messages.map(msg =>{
            return{
                ...msg._doc, 
                content : decrypt({content : msg.content, iv :msg.iv}) 
            };
        });
        res.status(201).json(decryptedMessages)
    }catch(error){
        res.status(500).json({error : error.message})
    }
}


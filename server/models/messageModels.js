const mongoose = require("mongoose");
const crypto = require('crypto');
const encryptionKey = process.env.ENCRYPTION_KEY;  // Utilisation de la clé d'environnement

// Schéma de message
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },  // Contenu chiffré du message
  iv: { type: String, required: true }, // IV utilisé pour le chiffrement
}, { timestamps: true });

// Méthode statique pour le chiffrement du contenu
MessageSchema.statics.encryptContent = function (content) {
  const iv = crypto.randomBytes(16);  // Générer un IV aléatoire
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'utf8'), iv);
  
  let encrypted = cipher.update(content, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    iv: iv.toString('hex'),  // Convertir l'IV en hex pour le stockage
    encryptedData: encrypted,
  };
};

// Méthode d'instance pour le déchiffrement du contenu
MessageSchema.methods.decryptContent = function () {
  const parts = this.content.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];

  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'utf8'), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;

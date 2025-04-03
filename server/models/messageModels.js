const mongoose = require("mongoose");
const crypto = ('crypto')


const secretKey = "ma_cle_secrete"; // stocker en variable d'environnement

const encryptMessage = (text) => {
  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decryptMessage = (encryptedText) => {
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });



const Message = mongoose.model("Message", MessageSchema);
module.exports = Message ; 

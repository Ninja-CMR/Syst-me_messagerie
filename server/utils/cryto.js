const crypto = require('crypto') ; 
const { models } = require('mongoose');
require('dotenv').config() ; 


const algorithm = 'aes-256-cbc';
//La clé de chiffrement doit être une chaine de 32 bytes (idéalement dérivée d'une variable de l'environnement)
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY , 'salt', 32);

function encrypt(text){
    //Générer un vecteur d'initialisation (IV) unique pour chaque chiffrement
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm , key , iv) ; 
    let encrypted = cipher.update(text , 'utf-8' ,'hex') ; 
    encrypted += cipher.final('hex');

    //Retourne à la fois l'IV et le texte chiffé(l'IV sera nécessaire pour le déchiffrement )

    return{iv : iv.toString('hex') , encryptedData : encrypted} ; 
}

//Fonction pour le décryptage 
function decrypt(encryptedData, ivHex) {
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  module.exports = {encrypt , decrypt} ;
  
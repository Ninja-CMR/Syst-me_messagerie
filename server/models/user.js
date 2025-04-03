const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "default-avatar.png" }, // URL de l'image
    status: { type: String, default: "Disponible" }, // Statut en ligne/hors ligne
  
  }, { timestamps: true });

  const User  = mongoose.model('User' , UserSchema)
  
  module.exports = User 



  
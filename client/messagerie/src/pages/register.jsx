import React from 'react'
import { useState } from 'react'
import API from '../axiosConfig' ; 
import '../css/register.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



 function Register() {
    const navigate = useNavigate() ;
   const [formData , setFormData] = useState({
    username : '' , 
    email : '' , 
    password : '' , 
   }) ; 
    const handleChange = (e)=>{
        setFormData({...formData ,[e.target.name] 
            : e.target.value 

        })
    } ; 
   const handleSubmit = async (e)=>{
    e.preventDefault() ; 
        try {
            const response  = await API.post('/auth/register', formData) ; 
            console.log('Inscription réussie : ', response.data) ; 
             // Stocker le token
        localStorage.setItem('token', response.data.token);

        // Stocker le userId
        localStorage.setItem('userId', response.data.user._id);

            navigate('/chat') ; 
        } catch (error) {
            console.error("Erreur lors de l'inscription : " ,error.response?.data) ; 
        }
    } ; 
  return (
    <div className='registerContainer'>
        <div className='imgLeft'>
            <h2>ProMess</h2>
        </div>
        <div className='rigth'>
        <form className='formRegister' onSubmit={handleSubmit}>
        <h2>Inscrivez-vous</h2>
        <label className='labelForm'>Nom</label>
            <input  onChange={handleChange}
             name="username"
            value={formData.username}  placeholder='Entrer votre nom' type="text" className='inputRegister' />
             <label className='labelForm'>Email</label>
            <input  onChange={handleChange}
            name='email'
            value={formData.email}
             placeholder='Email' type="email" className='inputRegister' />
              <label className='labelForm'>Mot de passe </label>
            <input  onChange={handleChange}
            name='password'
            value={formData.password}
             placeholder='Votre mot de passe ' type="password" className='inputRegister' />
             <button className='btnRegister' type='submit'>Inscrivez-vous</button>
             <p className='TextRegister'>Vous avez déjà un compte ? <Link to='/login' className='loginLink'>Connectez-vous</Link></p>
        </form>
        </div>      
    </div>
  )
}

export default Register
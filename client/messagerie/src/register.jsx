import React from 'react'
import { useState } from 'react'
import API from '../src/axiosConfig' ; 
import './css/register.css'



 function Register() {
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
        } catch (error) {
            console.error("Erreur lors de l'inscription : " ,error.response?.data) ; 
        }
    } ; 
  return (
    <div className='registerContainer'>
        
        <form className='formRegister' onSubmit={handleSubmit}>
        <h2>Register</h2>
            <input  onChange={handleChange}
             name="username"
            value={formData.username}  placeholder='Username' type="text" className='inputRegister' />
            <input  onChange={handleChange}
            name='email'
            value={formData.email}
             placeholder='Email' type="email" className='inputRegister' />
            <input  onChange={handleChange}
            name='password'
            value={formData.password}
             placeholder='Password' type="password" className='inputRegister' />
             <button className='btn' type='submit'>Submit</button>
             <p className='TextRegister'>You have already an account ? Signup</p>
        </form>
    </div>
  )
}

export default Register
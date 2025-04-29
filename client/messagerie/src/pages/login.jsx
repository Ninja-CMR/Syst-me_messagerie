import React, { useState } from "react"
import API from "../axiosConfig"
import '../css/register.css'
import {useNavigate} from 'react-router-dom' 

function Login(){
    const navigate = useNavigate(); 

    const [credentials , setCredentials] = useState({
        email : '' , 
        password : '' , 
    }) ; 
    const handleChange = (e)=>{
        setCredentials({...credentials , [e.target.name] : e.target.value })
    } ; 
    const handleSubmit = async(e) => {
        e.preventDefault() ; 
        try {
            const response = await API.post('/auth/login' , credentials) ; 
            if(response.data?.token){     
                                
                localStorage.setItem('userId', response.data.user._id);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.user.username);

                console.log('Connexion réussie : ' , response.data) ;
                navigate('/Chat') ; // Redirection vers chat.jsx apres succès

            } else{
                console.error('Aucun token recu')
            }           
        } catch (error) {
            console.error('Erreur de connexion : ' , error.response?.data || error.message) ; 
        }
    }
    return(
        <div className="registerContainer">
            <div className='imgLeft'>
                <h2>ProMess</h2>
             </div>
             <div className="rigth">
                <form className='formRegister' onSubmit={handleSubmit}>
                    <h2>Connexion</h2>
                    <label className='labelForm'>Email</label>
                    <input  onChange={handleChange}
                    name='email'
                    placeholder='Email' type="email" className='inputRegister' />
                    <label className='labelForm'>Mot de Passe </label>
                    <input  onChange={handleChange}
                    name='password'
                    placeholder='Password' type="password" className='inputRegister' />
                    <button className='btnRegister' type='submit'>Connectez-vous</button>
                </form>
            </div>
              
        </div>
    )
}
export default Login
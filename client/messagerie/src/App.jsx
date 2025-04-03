import { useState } from 'react'
import Register from './register'
import './css/App.css'
import io from 'socket.io-client'
import axios from 'axios'

//Notre application


function App() {
  axios.defaults.baseURL= 'http://localhost:3000'
  axios.defaults.withCredentials = true ; 

  const SendMessage = ()=>{
      const socket = io.connect('http://localhost:3000')
  }
  
  return(
    <div className='appContainer'>
     <Register></Register>
    </div>
  )
}

export default App

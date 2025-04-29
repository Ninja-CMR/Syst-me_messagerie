import { useState } from 'react'
import Register from '../src/pages/register'
import Login from '../src/pages/login'
import Navbar from './component/navbar'
import Home from './pages/Home'
import ChatApp from './chatApp'
import './css/App.css'
import { Routes , Route  } from 'react-router-dom';
import axios from 'axios'

//Notre application
 

function App() {
  axios.defaults.baseURL= 'http://localhost:3000'
  axios.defaults.withCredentials = true ; 

  
  
  return(
    <div className='appContainer'>
      <Navbar></Navbar>
  <main className='main-content'>
        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path='/register' element = {<Register/>}/> 
          <Route path='/login' element = {<Login/>}/>  
          <Route path='/Chat' element ={<ChatApp/>} />     
        </Routes>
  </main>
    </div>
  )
}

export default App

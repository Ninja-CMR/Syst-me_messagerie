import React from "react"
import '../css/home.css'
import { Link } from 'react-router-dom'
import Propos from "./propos"
function Home(){
    return(
        <div>
 <div className="homePages">
            <div className="banner">
                <h1>Bienvenue dans la meilleure application de système de messagerie pour entreprise</h1>
                <h4>Un système de messagerie concue pour les entreprises</h4>
                <Link to='/register'><button className="btnRegister">Inscrivez-vous !!</button></Link>
            </div>
         
        </div>
           <Propos></Propos>
        </div>
       
        
       
    )
}
export default Home 
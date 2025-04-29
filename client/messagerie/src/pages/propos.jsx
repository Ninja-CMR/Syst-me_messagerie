import React from 'react'
import '../css/propos.css'
import imgContext from '../assets/images/imgContexte.jpg'
import  imgPro from '../assets/images/imgPro.jpg'
import Card from '../component/card'
import {MessageSquareTextIcon , User , LockIcon , Clock} from 'lucide-react'
const feauture =[
    {
        title : 'Messagerie instantanée' ,
        description : 'Echangez des messages en temps réel avec vos collèges de manière fluide et rapide' , 
        icon : MessageSquareTextIcon ,
    } , 
    {
        title : 'Sécurité renforcée' ,
        description : 'Les conservations sont chiffrées pour garantir la confidentialité des échanges' , 
        icon : LockIcon,
    } , 
    {
        title : 'Organisation par équipes' ,
        description : 'Créez des groupes de discussion poue chaque projet de département ' , 
        icon : User ,
    },
    {
        title : 'Historique' ,
        description : 'Conservez une trace de toutes vos discussions professionnelles ' , 
        icon : Clock ,
    } , 
   
]
function Propos() {
  return (
    <section className='proposContainer'>
        <div className='propos'>
            <div className='partF'>
                <h2>ProMess ??</h2>
                <p>C'est une solution moderne de messagerie interne pensée pour les entreprises souhaitant améliorer
                    la communication de leurs équipes.
                </p>
            </div>
            <div className='imgF'>
                <img src={imgPro} alt="" className='imgPro'/>
            </div>
        </div>
        <div className='propos'>   
                <div className='imgF'>
                    <img src={imgContext} alt="" className='imgPro'/>
                </div>
                <div className='partF'>
                        <h2>Contexte</h2>
                        <p> Dans un environement
                            professionnel où la rapidité 
                            et la sécurité sont essentielles ,ProMess permet de fluidifier les 
                            échanges internes tout en
                            garantissant la confidentialité des données 
                        </p>
                </div>
                
        </div>
        <div className='CardSection'>
            <Card></Card>
        </div>
    </section>
   
  )
}

export default Propos
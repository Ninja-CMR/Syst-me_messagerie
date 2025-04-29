import React from 'react'
import {MessageSquareText, User, Lock, Clock } from 'lucide-react'
import '../css/card.css'

function Card({ title, description, icon: Icon }) {
  return (
    <div className='card'>
        <div className='iconCard'>
        {Icon && <Icon size={100} color='#ffffff' />}
        </div>
        <h3 className='TitleCard'>{title}</h3>
        <p className='DescriptionCard'>{description} </p>
    </div>
  )
}

export default Card
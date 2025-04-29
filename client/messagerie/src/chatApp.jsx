import React, { useEffect, useState } from 'react'
import socket from './socket';
import './css/chat.css'
import { useNavigate } from 'react-router-dom'




function ChatApp() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

  
    const senderId = localStorage.getItem('userId') // tu stockes l'id de l'utilisateur dans le localStorage lors de la connexion
    const receiverId = '66001d21c10f4a5c63222222';
    const token = localStorage.getItem('token') ;
  
    const sendMessage = async () => {

        if (!message.trim()) return;
      
            const data = {
              sender: senderId,
              receiver: receiverId, 
              content : message  , 
            };
      
        try {
            console.log("🚀 Données envoyées :", data);
          const response = await fetch('http://localhost:3000/api/messages/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' , 
              'Authorization': token , 
            },
            body: JSON.stringify(data)
          });
      
          if (!response.ok) {
            throw new Error('Erreur lors de l’envoi du message');
          }

          const result = await response.json();
          console.log("Message enregistré :", result);
      
          // Tu peux éventuellement émettre le message aussi en temps réel
          socket.emit('send_message', data);
          //Ajout immédiat du message à l'interface utilisateur
          setChat((prev) => [...prev, {...data, 
            fromSelf:true , 
          }]); 
      
          setMessage('');
        } catch (error) {
          console.error('Erreur :', error.message);
        }
      };
  
      useEffect(() => {
        const username = localStorage.getItem('username'); // Récupère automatiquement
        if (username) {
          socket.emit('userconnected', username); // Envoie automatiquement ton username réel
        } else {
          console.warn('Aucun username trouvé dans le localStorage.');
        }
        
        socket.on('updateOnlineUsers', (users) => {
          console.log('Membres en ligne :', users);
          setOnlineUsers(users);
        });
    
        return () => {
          socket.off('updateOnlineUsers');
        };
    }, []);
    
    return (
        <div className='chatApp'>
            <div className='paramètres'>
                params
            </div>
            <div className='leftSlide'>
                <h3>Discussion</h3>
                <div className='ContainerSearh'>
                    <input type="text" className='SearchInput'/>
                    <div>
                        <h2>Utilisateurs en ligne</h2>
                 <ul>
                  {onlineUsers.map((user, index) => (
                    <li key={index}>{user.username}</li>
                  ))}
                </ul>
                  </div>
                </div>
                <div className='filtre'>
                    <div className='btn-fonctionnalité' >
                        <button>Contacts</button>
                    </div>
                     <div className='btn-fonctionnalité' >
                        <button>Groupes</button>
                    </div>
                    <div className='btn-fonctionnalité' >
                        <button> important</button>
                    </div>
                </div>
               
            </div>
            <div className='rigthSlide'>
            {chat.map((message, index) => (
                    <div
                      key={index}
                      style={{ textAlign: message.fromSelf ? 'right' : 'left' }}
                    >
                      {message.content}
                    </div>
                  ))}
                <div className='sendMessage'>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Votre message"  className='inputSend'/>
                    <button onClick={sendMessage} className='btnSend'>Envoyer</button>
                </div>
            </div>
        
      </div>
    );
}

export default ChatApp
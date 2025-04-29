import React from 'react'
import { Link } from 'react-router-dom'
import '../css/navbar.css'
function Navbar(){
    return(
        <nav>
            <div className='navbar'>
                <div>
                    <Link to='/' className='navbar-brand'> ProMess </Link>
                </div>
            
                <div className="navbar-links">
                    <Link to='/' className='linkNav'>Acceuil</Link>
                    <Link to='/propos' className='linkNav'>A propos</Link>
                    <Link className='linkNav'> Contact</Link>
                    <Link to='/login' className='nav-link'>Login</Link>
                    <Link to='/register' className='nav-link'>Register</Link>
                </div>
            </div>
        </nav>
    )
}
export default Navbar
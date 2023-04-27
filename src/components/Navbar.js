import React from 'react'
import { Link } from 'react-router-dom'

//styles
import './Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {
  return (
    <div className='navbar'>
        <ul>
            <li>
                <img src={Temple} alt="project management app logo" />
                <span>Project management App</span>
            </li>
            
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li>
                <button className='btn'>Logout</button>
            </li>
        </ul>
    </div>
  )
}

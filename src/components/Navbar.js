import React from 'react';
import { Link } from 'react-router-dom';
import {  useLogout } from '../hooks/useLogout'
//styles
import './Navbar.css'
import Temple from '../assets/temple.svg'

export const Navbar = () => {
  const { logout } = useLogout()
  
  return (
    <div className='navbar'>
        <ul>
            <li>
                <img src={Temple} alt="project management app logo" />
                <span>Project management App</span>
            </li>
            
            <li><Link></Link></li>
            <li><Link></Link></li>
            <li><Link></Link></li>
            
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li>
                <button className='btn' onClick={logout}>Logout</button>
            </li>
        </ul>
    </div>
  )
}

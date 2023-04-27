import React from 'react'
import { NavLink } from 'react-router-dom'

//styles & images
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Homepage from '../pages/homepage/Homepage'

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='sidebar-content'>
            <div className='user'>
                {/* TODO */}
                {/* avatar and username */}
                <p>Hey user</p>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' element={<Homepage />}>
                            <img src={DashboardIcon} alt="dashboard icon" />
                            <span>Dashboard</span>
                        </NavLink>
                        <NavLink to='/create'>
                            <img src={AddIcon} alt="add project icon" />
                            <span>New Project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

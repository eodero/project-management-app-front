import { Link, useNavigate } from 'react-router-dom';
import {  useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
//styles
import './Navbar.css';

export const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const  navigate = useNavigate();

  
  const handleLogout = () =>{
    logout();
    navigate('/login')
  }
  
  return (
    <nav className='navbar'>
        <ul>
            <li className='title'>
                Project Manager
            </li>
          {!user && (
          <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
            </>
            )}
            
          {user && (
          <>
            <li>Hello, {user.name}</li>
            <li>
                <button className='btn' onClick={handleLogout}>Logout</button>
            </li>
          </>
            )}
            
        </ul>
    </nav>
  )
}

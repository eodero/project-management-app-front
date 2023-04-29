import { useState} from 'react';
import { useAuthContext } from './useAuthContext';
// import api from './path/to/your/api';

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    
    const logout = async () => {
        setError(null);
        setIsPending(true);
        
        //log user out
        try {
          await localStorage.removeItem('jwtToken');
    
          //dispatch log out function
        dispatch({ type: 'LOGOUT' });
        
        setIsPending(false);
        setError(null)

        } catch (err) {
          console.log(err.message)
          setError(err.message)
          setIsPending(false)
        }
    }
    return (error, isPending, logout)
}
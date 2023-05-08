import { useEffect, useState} from 'react';
import { useAuthContext } from './useAuthContext';
// import api from './path/to/your/api';

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    
    const logout = async () => {
        setError(null);
        setIsPending(true);
        
        //log user out
        try {
          await localStorage.removeItem('token');
    
          //dispatch log out function
        dispatch({ type: 'LOGOUT' });
        
        //update state
        if(!isCancelled){
          setIsPending(false);
          setError(null)
        }
        

        } catch (err) {
          if(!isCancelled){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
          }
        }
    }
    
    //clean up function - prevent memory leak
    useEffect(() => {
      return () => setIsCancelled(true)
    }, [])
    return { error, isPending, logout }
}
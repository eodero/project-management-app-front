import { useEffect, useState} from 'react';
import { useAuthContext } from './useAuthContext';
import api from '../utils/api';

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    
    const login = async (email, password) => {
        setError(null);
        setIsPending(true);
        
        //login user
        try {
          const res = await api.post('/users/login', {
            email,
            password,
           })
          //  console.log(res.data,res.data.token)
        
          if (!res || !res.data || !res.data.token) {
           setError('Could not complete log in')
           }
           
           //store jwt in local storage
           console.log('Received token:', res.data.token);
           localStorage.setItem('jwt', res.data.token)
    
          //dispatch log out function
        dispatch({ type: 'LOGIN', payload: res.data });
        
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
    return { login, error, isPending }
}
import { useEffect, useState} from 'react';
import { useAuthContext } from './useAuthContext';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();
    
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
           
           if(res.data.status === 'success'){
            setError(null);
            navigate("/");
           }
           
           //store jwt in local storage
          const token = res.data.token;
           localStorage.setItem('jwt', token)
    
          //dispatch log out function
        // dispatch({ type: 'LOGIN', payload: res.data });
        dispatch({ type: 'LOGIN', payload: { token } });
        
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
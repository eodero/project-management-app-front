import { useEffect, useState} from 'react';
import { useAuthContext } from './useAuthContext';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate();

  const register = async (name, email, password) => {
    setError(null)
    setIsPending(true)
    try {
      // register
      const res = await api.post('/users/register', {
        name,
        email,
        password,
      })

      if (!res || !res.data || !res.data.token) {
        throw new Error('Could not complete registration process')
      }
      
      if(res.data.status === 'success') {
        setError(null)
        navigate("/")
      };
      
      //store JWT in local storage
     localStorage.setItem('jwt', res.data.token)

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.data })
      
      
      //update state
      if(!isCancelled){
        setIsPending(false)
        setError(null)
      }
    } 
    
    catch(err) {
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
  return { register, error, isPending }
}
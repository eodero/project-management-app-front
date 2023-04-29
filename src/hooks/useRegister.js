import { useState} from 'react';
import { useAuthContext } from './useAuthContext';
import api from './path/to/your/api';

export const useRegister = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const register = async (name, email, password) => {
    setError(null)
    setIsPending(true)
    try {
      // register
      const res = await api.post('/users/register', {
        email,
        password,
        name,
      })

      if (!res) {
        throw new Error('Could not complete registration process')
      }

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res })

      setIsPending(false)
      setError(null)
    } 
    catch(err) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  return { register, error, isPending }
}
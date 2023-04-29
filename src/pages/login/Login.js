import React, { useState } from 'react'
import api from '../../utils/api'

//styles
import './Login.css'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const res = await api.post('/users/login', {
          data:{
          email,
          password
        }
      })
      console.log(res)
    } catch (err) {
      console.log(err.response.data);
      setError(err.message)
      setIsPending(false)
    }
  }
  
  return (
   <form onSubmit={handleSubmit} className='login-form'>
    <h2>Login</h2>
    <label>
      <span>email:</span>
      <input
       type='email'
       onChange={(e) => setEmail(e.target.value)}
       value={email}
      />
       
    </label>
    <label>
      <span>password:</span>
      <input
       type='password'
       onChange={(e) => setPassword(e.target.value)}
       value={password}
      />
       
    </label>
    {!isPending && <button className='btn'>Login</button>}
    {isPending && <button className='btn' disabled>Loading...</button>}
    {error && <div className='error'>{error}</div>}
   </form>
  )
}

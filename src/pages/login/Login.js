import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

//styles
import './Login.css'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    login(email, password)
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
    {error && <p className="error-message">Could not log you in. Please try again</p>}
    {!isPending && <button className='btn'>Login</button>}
    {isPending && <button className='btn' disabled>loading...</button>}
   </form>
  )
}

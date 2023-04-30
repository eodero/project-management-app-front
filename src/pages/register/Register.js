import React, { useState } from 'react';
import './Register.css'
import { useRegister } from '../../hooks/useRegister';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, error, isPending } = useRegister();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    register(name, email, password)
  };
  
  return (
    <form className='register-form' onSubmit={handleSubmit}>
      <h2> Register</h2>
      <label>
        <span>Name:</span>
        <input
        required
         type='text'
         onChange={(e) => setName(e.target.value)}
         value={name}
        />
      </label>
      <label>
        <span>email:</span>
        <input
        required
         type='email'
         onChange={(e) => setEmail(e.target.value)}
         value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
        required
         type='password'
         onChange={(e) => setPassword(e.target.value)}
         value={password}
        />
      </label>
      {!isPending && <button className='btn'>Register</button>}
      {isPending && <button className='btn' disabled>loading...</button>}
      {error && <p>{error}</p>}
    </form>
  )
}

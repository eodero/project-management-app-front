import React, { useState } from 'react';
// import axios from 'axios';
import api from '../../utils/api'
// import { useHistory } from 'react-router-dom'
//styles
import './Register.css'

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', {
        email,
        password,
        name,
      })
    } catch (err) {
      console.log(err.message);
      setError(err.message)
      setIsPending(false)
    }
    console.log(email, password, name)
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
      {isPending && <button className='btn' disabled>Loading...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

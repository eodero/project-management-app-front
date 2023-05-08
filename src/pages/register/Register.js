import React, { useState } from 'react';
import './Register.css'
import { useRegister } from '../../hooks/useRegister';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const { register, isPending } = useRegister();
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
      if(password1 !== password) {
       setErrorMessage("The passwords do not match, please try again");
       return;
      } else {
        setErrorMessage('');
      }
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
      <label>
        <span>Confirm password:</span>
        <input
        required
         type='password'
         onChange={(e) => setPassword1(e.target.value)}
         value={password1}
        />
      </label>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {!isPending && <button className='btn'>Register</button>}
      {isPending && <button className='btn' disabled>loading...</button>}
    </form>
  )
}

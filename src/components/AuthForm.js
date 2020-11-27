import { authService } from 'fbase';
import React, { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');
  const onChange = e => {
    const { target: { value } } = e;
    setValue(value);
  }
  return { value, onChange };
}
const AuthForm = () => {
  const email = useInput();
  const password = useInput();
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email.value, password.value);

      } else {
        await authService.signInWithEmailAndPassword(email.value, password.value);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount(prev => !prev);
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input type='email' placeholder='Email' required {...email} className="authInput" />
        <input type='password' placeholder='password' required {...password} className="authInput" />
        <input type='submit' className="authInput authSubmit" value={newAccount ? 'Create Account' : 'Log In'} />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? 'Log in' : 'Create Account'}
      </span>
    </>
  );
}
export default AuthForm;
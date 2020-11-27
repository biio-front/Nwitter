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
      <form onSubmit={onSubmit}>
        <input type='email' placeholder='Email' required {...email} />
        <input type='password' placeholder='password' required {...password} />
        <input type='submit' value={newAccount ? 'Create Account' : 'Log In'} />
      </form>
      <span onClick={toggleAccount}>{newAccount ? 'Log in' : 'Create Account'}</span>
      <span>{error}</span>
    </>
  );
}
export default AuthForm;
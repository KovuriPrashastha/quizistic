import React from 'react';

function login({
  signInPasswordError,
  signInEmailError,
  signInEmail,
  setSignInPassword,
  SignInPassword,
  setSignInEmail,
  userName,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleSignup,
  emailError,
  passwordError,
  userNull,
}) {
  return (
    <center className='landing-page'>
      <h5 className='form__heading'> Sign - In Below </h5>
      <input
        placeholder='Email'
        className='form__field'
        type='text'
        autoFocus
        required
        value={signInEmail}
        onChange={(e) => setSignInEmail(e.target.value)}
      />
      <p className='error_'> {signInEmailError} </p>{' '}
      <input
        className='form__field'
        placeholder='Password'
        type='password'
        required
        value={SignInPassword}
        onChange={(e) => setSignInPassword(e.target.value)}
      />
      <p className='error_'> {signInPasswordError} </p>{' '}
      <button className='btn' onClick={handleLogin}>
        Sign In
      </button>
      <br />
      <h5 className='form__heading'> Sign - Up Below </h5>
      <input
        className='form__field'
        placeholder='Your Name'
        type='text'
        autoFocus
        required
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      {userNull ? <p className='error_'>Enter A User Name</p> : null}
      <br />
      <br />
      <input
        className='form__field'
        placeholder='Email'
        type='text'
        autoFocus
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className='error_'> {emailError} </p>
      <input
        className='form__field'
        placeholder='Choose Your Password'
        type='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className='error_'> {passwordError} </p>
      <button className='btn' onClick={handleSignup}>
        Sign Up
      </button>
    </center>
  );
}

export default login;

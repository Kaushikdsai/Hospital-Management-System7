import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Homescreen({ handleAuthentication }){
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
  const [error, setError]=useState('');
  const navigate=useNavigate();

  const handleLogin = () => {
    console.log("ENV username:", process.env.REACT_APP_HMS_USERNAME);
    console.log("ENV password:", process.env.REACT_APP_HMS_PASSWORD);
    if(username === process.env.REACT_APP_HMS_USERNAME && password === process.env.REACT_APP_HMS_PASSWORD){
      handleAuthentication(true);
      setError('');
      navigate('/admin');
    }
    else{
      setError('Invalid username or password');
      setUsername('');
      setPassword('');
    }
  }

  return(
    <div>
      <div className="login-main">
        <h1>LOGIN</h1>
        {error && <p style={{color: 'red'}}>{error}</p>}
          <label>Username</label>
          <input 
            type='text'
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}>
          </input>
          <label>Password</label>
          <input 
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}>
          </input>
          <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Homescreen;
import styles from './auth.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Popup from '../popup/Popup';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      let res = await fetch('https://blue-wildflower-7641.fly.dev/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });
      const json = await res.json();
      if (res.status === 200) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('user', true);
        localStorage.setItem('username', json.user.username);
        localStorage.setItem('id', json.user._id);
        setUsername('');
        setPassword('');
        navigate('/');
      }
      else {
        setMessage(json.message);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      navigate('/');
    }
  })

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>
          <label htmlFor="username"></label>
          <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" type="text" name='username'/>
          <label htmlFor="password"></label>
          <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" name='password'/>
          <button className={`${styles.submit} ${styles.button}`}>Log in</button>
        </form>
        <hr />
        <div className={styles.noAccount}>
          <span className={styles.noAccountInfo}>Don't have an account?</span>
          <button onClick={() => navigate('/signup')} className={styles.button}>Create account</button>
        </div>
      </div>
      {message && <Popup data={message}/>}
    </>
  )
}

export default Login;
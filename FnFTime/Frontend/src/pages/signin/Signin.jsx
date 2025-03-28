import { Button, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from "https://cdn.skypack.dev/classnames@2.3.2";
import "./signin.css";
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const Signin = () => {
  const [switched, setSwitched] = useState(false);
  const[form,setForm]=useState({
    name:'',
    email:'',
    password:'',
    phone:'',
    address:'',
    role:''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const validateForm = () => {
    const validationErrors = {};
    if (!form.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!form.password) {
      validationErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const role = await login(form.email, form.password);
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/')
        }
        // navigate('/');
      } catch (error) {
        alert('Login failed! Please try again.');
      }
    }
  };

  const handleRegister = () => {
    if (validateForm()) {
      axios.post('https://fnftime.onrender.com/register', form)
        .then((res) => {
          alert('Registration successful! Please log in.');
          setSwitched(false); // Switch to login form
        })
        .catch((error) => {
          alert('Registration failed! Please try again.');
        });
    }
  };

  return (
    <div className="local-container">
      <div className={cn('demo', { 's--switched': switched })}>
        <div className="demo__inner">
          <div className="demo__forms">
            <div className="demo__form">
              <div className="demo__form-content">
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form__heading">WELCOME BACK</div>
                <TextField label='Email' variant='outlined' name='email' value={form.email} onChange={(e)=>{
                  setForm({...form,email:e.target.value})}}
                  error={!!errors.email}
                  helperText={errors.email}/>
                <TextField label='Password' variant='outlined' name='password' type='password' value={form.password} onChange={(e)=>{
                  setForm({...form,password:e.target.value})}}
                  error={!!errors.password}
                  helperText={errors.password}/>
                <Button color='primary' variant='contained' onClick={handleLogin}>Login</Button>
                <Typography variant="body2" color="textSecondary" align="center">
                    Note: This application is in development stage and the backend is deployed on render.com, so it may take some time to login.
                </Typography>
              </form>
              </div>
            </div>
            <div className="demo__form">
              <div className="demo__form-content">
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form__heading">Create a new Account</div>
                <TextField label='Name' variant='outlined' name='name' value={form.name} onChange={(e)=>{
                  setForm({...form,name:e.target.value})}}
                  error={!!errors.name}
                  helperText={errors.name}/>
                <TextField label='Email' variant='outlined' name='email' value={form.email} onChange={(e)=>{
                  setForm({...form,email:e.target.value})}}
                  error={!!errors.email}
                  helperText={errors.email}/>
                <TextField label='Password' variant='outlined' name='password' type='password' value={form.password} onChange={(e)=>{
                  setForm({...form,password:e.target.value})}}
                  error={!!errors.password}
                  helperText={errors.password}/>
                <Button color='primary' variant='contained' onClick={handleRegister}>Sign Up</Button>
              </form>
              {/* <FakeForm heading="Time to feel like home" fields={['name', 'email', 'password']} submitLabel="Sign up" /> */}
              </div>
            </div>
          </div>
          <div className="demo__switcher">
            <div className="demo__switcher-inner">
              <div className="demo__switcher-content">
                <div className="demo__switcher-text">
                  <div>
                    <h3>New to FnFTime?</h3>
                    <p>Sign up, add your Friends and Family!</p>
                  </div>
                  <div>
                    <h3>One of us?</h3>
                    <p>If you already have an account, just sign in. We've missed you!</p>
                  </div>
                </div>
                <button className="demo__switcher-btn" onClick={() => setSwitched(!switched)}>
                  <span className="animated-border"></span>
                  <span className="demo__switcher-btn-inner">
                    <span>Sign Up</span>
                    <span>Sign In</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
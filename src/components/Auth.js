import React, { useState } from 'react'
import 'styles/Auth.scss';
import {authService} from '../fbase';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { async } from '@firebase/util';


function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (e) => {
    console.log('e.target.name->',e.target.name)
    console.log(e);
    const {target:{name, value}} = e;
    if(name === 'email'){
      setEmail(value);
    }else if(name === 'password'){
      setPassword(value)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if(newAccount){
        //회원가입
        data = await createUserWithEmailAndPassword(authService, email, password)
      }else{
        //로그인
        data = await signInWithEmailAndPassword(authService, email, password)
      }
      console.log('data->',data);
    }catch(error){
      console.log('error->',error);
      setError(error.message);
    }
  }
  const toggleAccount = () => setNewAccount(prev => !prev);

  const onSocialClick = async (e) => {
    const {target:{name}} = e;
    let provider;
    console.log('e.target.name->',e.target.name)
    if(name === "google"){
      provider = new GoogleAuthProvider();
    }else if(name === "github"){
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider)
    console.log('data->',data);
  }

  return (
    <div className='bg'>
      <span className='login'>LOGIN</span>
      <form onSubmit={onSubmit}>
        <label className='Email'>email</label>
        <input name="email" type='email'  required 
        value={email} onChange={onChange} /> 
        <label className='password'>password</label>
        <input name="password" type='password' required 
        value={password} onChange={onChange}/>
        <input className='submit' type='submit' value={newAccount ? "Create Account" : "로그인"}/>
      </form>
      <span className='account' onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div className='btn'>
        <button onClick={onSocialClick} name="Apple"><span className='Apple'></span>애플로 로그인하기</button>
        <button onClick={onSocialClick} name="google"><span className='google'></span>구글로 로그인하기</button>
        <button onClick={onSocialClick} name="github"><span className='github'></span>깃허브로 로그인하기</button>
      </div>
    </div>
  )
}

export default Auth
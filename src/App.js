import React, { useEffect, useState } from 'react'
import AppRouter from './Router'
import { authService } from './fbase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [isLogIn,setIsLogIn] = useState(false);
  const [user,setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(authService, (user) => { 
      if (user) {
        setIsLogIn(user);
        setUser(user);
      } else {
        setIsLogIn(false);
      }
    });
  },[])
  return (
    <>
    <AppRouter isLogIn = {isLogIn} user = {user}/>
    </>
  );
}

export default App;
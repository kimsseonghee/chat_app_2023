import Auth from 'components/Auth'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chats from 'routes/Chats'
import Chatting from 'routes/Chatting'
import Find from 'routes/Find'
import Friend from 'routes/Friend'
import Main from 'routes/Main'
import More from 'routes/More'
import Profile from 'routes/Profile'

function AppRouter({isLogIn,user}) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isLogIn ? (
          <>
        <Route path='/' element={<Main user = {user}/>}/>
        <Route path='/Profile' element={<Profile user = {user}/>}/>
        <Route path='/Friend' element={<Friend/>}/>
        <Route path='/Chats' element={<Chats/>}/>
        <Route path='/Chatting' element={<Chatting user = {user}/>}/>
        <Route path='/Find' element={<Find user = {user}/>}/>
        <Route path='/More' element={<More/>}/>
          </>
        ) : ( 
          <Route path='/' element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
    )
}

export default AppRouter
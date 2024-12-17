import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useAppStore } from './store'
import { useState } from 'react'
import { GET_USER_INFO } from './utils/constants'
import { apiClient } from './lib/api-client'

// Define a Private route
const PrivateRoute = ({children})=>{
  const { userInfo }= useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth"/>
}

const AuthRoute = ({children})=>{
  const { userInfo }= useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat"/> : children ;
}

const App = () => {
  // Get the userinfo from server
  const { userInfo,setUserInfo }= useAppStore();
  const [loading, setLoading]= useState(true);
  useEffect(()=>{
  const getUserData = async()=>{
    try {
      const response = await apiClient.get(GET_USER_INFO, {withCredentials: true});
      if(response.status === 200 && response.data.id) {
        setUserInfo(response.data)
      }else{
        setUserInfo(undefined)
      }
      console.log({response});
    } catch (error) {
      setUserInfo(undefined)
    } finally{
      setLoading(false);
    }
  };
  if(!userInfo){
    getUserData()
  }else{
    setLoading(false);
  }
  },[userInfo,setUserInfo]);

  if(loading){
    return <div>Loading...</div>
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* Page Routes */}
        {/* Authentication route */}
        <Route path="/auth" element={
          <AuthRoute>
            <Auth/>
          </AuthRoute>}
        />
        {/* Chat route using Private route */}
        <Route path="/chat" element={
          <PrivateRoute>
            <Chat/>
          </PrivateRoute>}
        />
        {/* Profile route  using Private route */}
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>}
        />

        {/* Default Route for the Authendication */}
        <Route path="*" element={<Navigate to="/auth" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
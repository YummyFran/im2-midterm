"use client"
import { logOutCookie } from '@/lib/authService'
import React from 'react'

const LandingClient = ({ logOut, isAuth, }) => {

  const handleLogout = () => {
     Promise.all([
      logOutCookie(),
      logOut()
    ]);
  }
  return (
    <>
      <h1>Hello {isAuth?.user?.name}</h1>
      <button onClick={() => handleLogout()}>Log out</button>
    </>
  )
}

export default LandingClient
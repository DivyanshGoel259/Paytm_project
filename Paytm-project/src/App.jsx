import { useState } from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import {SignupPage} from './pages/SignupPage'
import {SigninPage} from './pages/SigninPage'
import {DashboardPage} from './pages/DashboardPage'
import {SendMoneyPage} from './pages/SendMoneyPage'

import './App.css'

function App() {
  

  return (
    <>
      <BrowserRouter>

      <Routes>
        <Route path='/' element={<SignupPage></SignupPage>}/>
        <Route path='/signin' element={<SigninPage></SigninPage>}/>
        <Route path='/dashboard' element={<DashboardPage></DashboardPage>}/>
        <Route path='/send' element={<SendMoneyPage></SendMoneyPage>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

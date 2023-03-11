import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import Home from '../../Pages/Home/Home'

import '../../assets/css/app.css'
import '../../assets/css/globals.css'
import Create from '../Create/Create'
import Footer from '../../Components/Footer/Footer'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path='create' element={<Create />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
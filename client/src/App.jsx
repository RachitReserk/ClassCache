import React, { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Navbar from './components/NavBar/NavBar.jsx'
import Footer from './components/Footer/Footer.jsx'
import {Routes , Route} from "react-router-dom"
import Store from './pages/Store.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import SignIn from './pages/SignIn.jsx'
import Verify from './pages/Verify.jsx'
import UserHistory from './components/Profile/orderHistory.jsx'
import SignUp from './pages/SignUp.jsx'
import Fav from './components/Profile/fav.jsx'
import Recovery from './pages/Recovery.jsx'
import Profile from './pages/Profile.jsx'
import Setting from './components/Profile/setting.jsx'
import NoteDetails from './components/NoteDetails/NoteDetails.jsx'
import { ToastContainer} from 'react-toastify';
import { useDispatch , useSelector } from 'react-redux'
import { authActions } from './store/auth.js'
import axios from 'axios'
import SearchContent from './pages/SearchContent.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Admin from './pages/admin.jsx'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetch = async() => {
      const response = await axios.get('https://class-cache-be.vercel.app/api/userInfo',{ withCredentials: true })
      if(response.data){
        {
          dispatch(authActions.login())
        }
    }
  }
  fetch()
  },[dispatch])
  return (
    <div className="scroll-smooth cursor-default realtive overflow-x-hidden bg-white2 text-dark">
      <ToastContainer
      position="top-right"
      autoClose={false}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      transition: Bounce
      />
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/store' element={<Store/>}></Route>
          <Route path='/store/:branch/:semester' element={<SearchContent></SearchContent>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contribute' element={<Contact/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/signin' element={<SignIn/>}></Route>
          <Route path='/signin/recovery' element={<Recovery/>}></Route>
          <Route path='/recovery' element={<Recovery/>}></Route>
          <Route path='/reset-password/:token' element={<ResetPassword/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/verify-email/:token' element={<Verify/>}></Route>
          <Route path='/profile' element={<Profile/>}>
           <Route index element={<Fav/>}></Route>
           <Route path='/profile/orderHistory' element={<UserHistory/>}></Route>
           <Route path='/profile/settings' element={<Setting/>}></Route>
          </Route>
          <Route path='/note-details/:id' element={<NoteDetails/>}></Route>
        </Routes>
        <Footer />
    </div>
  )
}

export default App
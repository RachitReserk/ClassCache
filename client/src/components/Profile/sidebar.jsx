import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {authActions} from '../../store/auth.js'
import { LuLogOut } from "react-icons/lu";
import axios from 'axios'

const sideBar = ({data}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className='mt-10 bg-yellow-100 p-4 rounded flex flex-col items-center justify-between h-[90%]'>
    <div className='flex items-center flex-col justify-center'>
      {" "}
    <img src={data.avatar} className='h-[12vh]'></img>
    <p className='mt-3 text-2xl font-semibold'>{data.username}</p>
    <p className='mt-3 text-xl border-b-4 border-yellow-500  font-semibold'>{data.email}</p>
    <div className='mt-1 text-xl font-semibold lg:block'></div>
    </div>
    
    <div className='w-full flex-col items-center justify-center hidden md:flex'>
      <Link 
      to='/profile'
      className='font-semibold w-full  hover:bg-yellow-400 py-2 text-center bg-yellow-200 rounded trainsiion:all'
      >
      Favourites
      </Link>
      </div>
      <div className='gap-1 items-center justify-center w-full py-2 flex text-center hover:bg-yellow-400 rounded trainsiion:all md:hidden'>
      <Link 
      to='/profile'
      className='font-semibold w-full py-2 text-center bg-yellow-200 rounded trainsiion:all'
      >
      Favourites
      </Link>
      </div>

      <div onClick={
        async () => {
          try {
            const response = await axios.post(
              'https://class-cache-be.vercel.app/api/logout',
              {},
              {
                withCredentials: true 
              }
            );
          dispatch(authActions.logout())
          navigate('/')
          } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
          }
        }
      } className='cursor-pointer font-semibold bg-yellow-200 gap-1 items-center justify-center w-full py-2 flex text-center hover:bg-yellow-400 rounded trainsiion:all'>
      <button>Logout</button><LuLogOut />
    </div>
    </div>
  )
}

export default sideBar

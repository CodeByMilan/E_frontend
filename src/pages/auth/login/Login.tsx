import  { useEffect, useState } from 'react'
import Navbar from '../../../globals/components/navbar/Navbar'
import Form from '../form/Form'
import { login, resetStatus } from '../../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { useNavigate } from 'react-router-dom'
import { authStatus } from '../../../storetypes/storeTypes'
import { UserloginType } from '../types'
import Footer from '../../../globals/components/footer/Footer'

const Login = () => {
  const {status}=useAppSelector((state)=>state.auth)
  const [error,setError]=useState<string|null>(null)

  const navigate =useNavigate()
  const dispatch =useAppDispatch()
  const handlelogin=(data:UserloginType)=>{
    // console.log(data)
    dispatch(login(data))  
  }
  const clearError = () => {
    setError(null);
  };
  useEffect (()=>{
    if(status===authStatus.success){
      dispatch(resetStatus())
      navigate("/")
      setError(null)
    }
    if(status==authStatus.error){
      setError("Invalid Creadentials Please check your email and password")
    }
  },[status,navigate,dispatch])
  return (
    <>
    <Navbar/>
      <Form type="Login" onSubmit={handlelogin} error={error} onClearError={clearError}/>
      <Footer/>
    </>
  )
}

export default Login
import  { useEffect, useState } from 'react'
import Navbar from '../../../globals/components/navbar/Navbar'
import Form from '../form/Form'
import { UserDataTypes } from '../types'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { register, resetStatus } from '../../../store/authSlice'
import { authStatus } from '../../../storetypes/storeTypes'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../globals/components/footer/Footer'


const Register = () => {
  //accessing the slice from the store as useappselector will return the whole store so we need to access the slice needed
  const {status}=useAppSelector((state)=>state.auth)
  const navigate =useNavigate()
  const dispatch =useAppDispatch()
  const [error,setError]=useState<string|null>(null)
  const handleRegister=(data:UserDataTypes)=>{
    // console.log(data)
    dispatch(register(data))  
  }
  useEffect (()=>{
    if(status===authStatus.success){
      dispatch(resetStatus())
      navigate("/login")
    }
    if(status==authStatus.error){
      setError("Invalid Creadentials Please check your email and password")
    }
    // else{
    //   alert("something went wrong")
    //   navigate("/register")
    // }
  },[status,navigate,dispatch])
  const clearError = () => {
    setError(null);
  };
  return (
    <>
    <Navbar/>
    <Form type="Register"error={error} onSubmit={handleRegister} onClearError={clearError}/>
    <Footer/>
    </>
  )
}

export default Register
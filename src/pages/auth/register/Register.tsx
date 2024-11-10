import  { useEffect } from 'react'
import Navbar from '../../../globals/components/navbar/Navbar'
import Form from '../form/Form'
import { UserDataTypes } from '../types'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { register, resetStatus } from '../../../store/authSlice'
import { authStatus } from '../../../storetypes/storeTypes'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  //accessing the slice from the store as useappselector will return the whole store so we need to access the slice needed
  const {status}=useAppSelector((state)=>state.auth)
  const navigate =useNavigate()
  const dispatch =useAppDispatch()
  const handleRegister=(data:UserDataTypes)=>{
    // console.log(data)
    dispatch(register(data))  
  }
  useEffect (()=>{
    if(status===authStatus.success){
      dispatch(resetStatus())
      navigate("/login")
    }
    // else{
    //   alert("something went wrong")
    //   navigate("/register")
    // }
  },[status,navigate,dispatch])
  return (
    <>
    <Navbar/>
    <Form type="Register" onSubmit={handleRegister}/>
    </>
  )
}

export default Register
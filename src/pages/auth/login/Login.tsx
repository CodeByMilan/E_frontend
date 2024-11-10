import  { useEffect } from 'react'
import Navbar from '../../../globals/components/navbar/Navbar'
import Form from '../form/Form'
import { login, resetStatus } from '../../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { useNavigate } from 'react-router-dom'
import { authStatus } from '../../../storetypes/storeTypes'
import { UserloginType } from '../types'

const Login = () => {
  const {status}=useAppSelector((state)=>state.auth)

  const navigate =useNavigate()
  const dispatch =useAppDispatch()
  const handlelogin=(data:UserloginType)=>{
    // console.log(data)
    dispatch(login(data))  
  }
  useEffect (()=>{
    if(status===authStatus.success){

      dispatch(resetStatus())
      navigate("/")
    }
    // else{
    //   alert("something went wrong")
    //   navigate("/register")
    // }
  },[status,navigate,dispatch])
  return (
    <>
    <Navbar/>
      <Form type="Login" onSubmit={handlelogin}/>
    </>
  )
}

export default Login
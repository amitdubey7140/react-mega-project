import React,{useState, useEffect} from 'react'
import { UseSelector, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({children,authentication}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state=>state?.auth?.status)
    useEffect(()=>{
        if (authentication && authStatus !== authentication) {
              navigate('/login')  
        }else if (!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
    },[authStatus,navigate,authentication])
  return loader ? <h1>Loding...</h1>:<>{children}</>
}

export default AuthLayout
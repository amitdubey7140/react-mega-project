import React, {useState} from 'react'
import authService from '../../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import { login } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import {Button,Input} from '../index'
function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const signup = async(data)=>{
        setError('')
        try {
           const userData = await authService.createAccount(data)
           if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate('/')
           }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div>
        <p className='text-red-600'>{error}</p>
        <form onSubmit={signup}>
            <Input
              label='Full Name'
              type='text'
              placeholder = 'Enter your fullname'
              {
                ...register('name',{
                    required:true
                })
              }  
            />
            <Input
              label='Email'
              type='email'
              placeholder = 'Enter your email'
              {
                ...register('email',{
                    required:true
                })
              }  
            />
            <Input
              label='Password'
              type='password'
              placeholder = 'Enter your Password'
              {
                ...register('password',{
                    required:true
                })
              }  
            />

            <Button
                 type='submit'
            >
                Signup
            </Button>
        </form>

        <Link to={'/login'}>
              Already have account? SignIn
        </Link>
    </div>
  )
}

export default Signup
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { Input, Button } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError('')
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="">
        <p className="text-red-600">{error}</p>
      <form onSubmit={handleSubmit(login)}>
        <Input
          lable="Email"
          placeholder="Enter Your Email"
          type="email"
          {...register("email", {
            required: true,
          })}
        />
        <Input
          lable="Password"
          placeholder="Enter Your Password"
          type="password"
          {...register("password", {
            required: true,
          })}
        />

        <Button
            type="submit"
        >
            Sign In
        </Button>
      </form>
      
      <Link>
          Don't have account? SignUp
      </Link>
    </div>
  );
}

export default Login;

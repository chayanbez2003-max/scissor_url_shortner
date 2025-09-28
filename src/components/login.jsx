import React, { use, useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners';
import Error from './error';
import * as Yup from 'yup';
import {login} from "@/db/apiAuth";
import useFetch from "@/hooks/use.fetch";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';

const Login = () => {
const [errors, setErrors] = useState({});
  const [formData , setFormData] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink =searchParams.get("createNew");

  
  const handleInputChange = (e) =>{
    const {name, value}= e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:value,
    }))
}

const {data,error,loading,fn:fnLogin} = useFetch(login,formData)

const {fetchUser} = UrlState()
useEffect(()=>{ 
  if(error===null && data){
    navigate(`/dashboard?${longLink?`createNew=${longLink}`:"" }`)
    fetchUser();
}},[data,error])

const handleLogin= async ()=>{
  setErrors([])
  try {
    const schema =Yup.object().shape({
      email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
      
      password:Yup.string()
      .min(6,"Password must be at least 6 characters")
      .required("Password is required"),

    })
    await schema.validate(formData,{abortEarly:false})
     //api call

     await fnLogin();
  } catch (e) {
    const newErrors ={};
    e?.inner?.forEach((err)=>{
      newErrors[err.path]= err.message;
    })
    setErrors(newErrors)

  }
}


  return (
    <Card>
  <CardHeader>
    <CardTitle>Login</CardTitle>
    <CardDescription className="text-gray-400">to your account if you have already one</CardDescription>
     {error  && <Error message = {error.message}/>}
  </CardHeader>
  <CardContent className="space-y-4">
        <div>
          <Input
            type="email" 
            name="email" 
            placeholder="Enter Email"
             onChange={handleInputChange}
            className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white"
          />
          {errors.email  && <Error message = {errors.email}/>}
       </div>  
       <div>
           <Input
            type="password" 
            name="password" 
            placeholder="Enter password"
            onChange={handleInputChange}
            className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white"
          />
          {errors.password && <Error message = {errors.password}/>}
        </div>
        </CardContent>
  <CardFooter>
    <Button onClick={handleLogin} className="bg-white text-black hover:bg-gray-200 w-1/4">
    {loading?<BeatLoader size={10} color="#36d7b7"/>:"Login"} </Button>
  </CardFooter>
</Card>
  )
}

export default Login

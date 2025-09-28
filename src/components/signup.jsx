import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input";
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners';
import Error from './error';
import * as Yup from 'yup';
import {signup} from "@/db/apiAuth";
import useFetch from "@/hooks/use.fetch";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';

const Signup = () => {
const [errors, setErrors] = useState({});
  const [formData , setFormData] = useState({
    name:"",
    email:"",
    password:"",
    profile_pic:null,
  })
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink =searchParams.get("createNew");

  
  const handleInputChange = (e) =>{
    const {name, value,files}= e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:files? files[0] :value,
    }))
}

const {data,error,loading,fn:fnSignup} = useFetch(signup,formData)

const {fetchUser} = UrlState
useEffect(()=>{ 
  if(error===null && data){
    navigate(`/dashboard?${longLink?`createNew=${longLink}`:"" }`)
    fetchUser();
}},[error,loading,data])

const handlesignup= async ()=>{
  setErrors({})
  try {
    const schema =Yup.object().shape({
      name: Yup.string()
      .required("Name is required"),

      email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
      
      password:Yup.string()
      .min(6,"Password must be at least 6 characters")
      .required("Password is required"),

      profile_pic:Yup.mixed().required("Profile picture is required")

    })
    await schema.validate(formData,{abortEarly:false})
     //api call

     await fnSignup();
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
    <CardTitle>Signup</CardTitle>
    <CardDescription className="text-gray-400">Create a new accont if you haven&rsquo;t already</CardDescription>
     {error  && <Error message = {error.message}/>}
  </CardHeader>
  <CardContent className="space-y-4">
      <div>
          <Input
            type="text" 
            name="name" 
            placeholder="Enter name"
             onChange={handleInputChange}
            className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white"
          />
          {errors.name  && <Error message = {errors.name}/>}
       </div>  
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
       <div>
           <Input
            type="file" 
            name="profile_pic" 
            accept = "image/*"
            onChange={handleInputChange}
            className="bg-transparent border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white"
          />
          {errors.profile_pic && <Error message = {errors.profile_pic}/>}
        </div>
        </CardContent>
  <CardFooter>
    <Button onClick={handlesignup} className="bg-white text-black hover:bg-gray-200 w-2/5">
    {loading?<BeatLoader size={10} color="#36d7b7"/>:"Create Account"} </Button>
  </CardFooter>
</Card>
  )
}

export default Signup

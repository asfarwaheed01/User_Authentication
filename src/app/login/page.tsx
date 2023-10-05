"use client"; 
import Link from "next/link";
import React,{ useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login Successful",response.data);
            toast.success("Login Success");
            router.push("/profile")
        } catch (error:any) {
            console.log("Login Failed", error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return(
        <div className="text-center flex flex-col justify-center min-h-screen py-2">
            <h1>{loading ? "Processing":"Login"}</h1>
            <hr />
            <label htmlFor="username">Email</label>
            <input className="w-[10%] mx-auto p-1 mb-2 text-black" type="text" id="username" value={user.email} placeholder="email" onChange={(e) => setUser({...user, email:e.target.value})}/>
            <label htmlFor="username">Password</label>
            <input className="w-[10%] mx-auto p-1 text-black" type="password" id="username" value={user.password} placeholder="password" onChange={(e) => setUser({...user, password:e.target.value})}/>
            <button onClick={onLogin}
  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[9%] mx-auto mt-[10px]"
>
  {buttonDisabled ? "Fill in Please":"Login"}
</button>
<Link href="/signup">Dont have account Sign up</Link>

        </div>
    )
}
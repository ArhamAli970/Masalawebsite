"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function SignUp(){
    const[error,setError]=useState("");

    const rout=useRouter();
    let init={email:"",password:"",number:""}
    const[data,setData]=useState(init);
    const[disable,setDisable]=useState(true);
    const[showPass,setShowPass]=useState(false);


    useEffect(()=>{
        if(data.email.length==0 || data.number.length==0 || data.password.length==0){
            setDisable(true)
        }else{
            setDisable(false);
        }
    },[data]);

    function call(e){
        setData({...data,[e.target.name]:e.target.value});
    }

    async function sign(e){
        e.preventDefault();
        await axios.post("/api/sign",data)
        .then((res)=>{
            if(res.data.data=="done"){
            rout.push("/login")
            }else{
              setError(res.data.data)
            }
            
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }



    return(
        
         <div className="frm flex-1">
              <div className="sup  border-2 border-black  rounded-md sm:w-1/2 p-4">
                    <h1 className="lg">Sign Up</h1>
                    <form action="" >
                        <div className="ema com" >
                        <input className="bx" type="text" value={data.email} onChange={call} name="email" placeholder="Enter Email"/>
                        </div>
                        <div className="pass com relative">
                            <input  className="bx" type={showPass?"text":"password"}
                            value={data.password} onChange={call} name="password" placeholder="Enter Password"/>
                            <span className="absolute right-[15%] top-[0.76rem]" onClick={(e)=>{e.preventDefault(); setShowPass(!showPass)}}>{showPass?<VisibilityIcon/>:<VisibilityOffIcon/>}</span>
                        </div>
                        <div className="phoneNum com">
                            <input className="bx" type="text" name="number" value={data.number} onChange={call} placeholder="Enter Phonenumber" />
                        </div>

                        <div className="com m-1">
                            {!disable?
                        <button onClick={sign} className="border-2 border-black  text-white bg-black rounded-md p-2 w-1/2  
                        ">
                        signup
                        </button>
                        :
                        <button onClick={sign}  className="border-2 border-gray  text-black font-bold bg-gray rounded-md p-2 w-1/2  
                        ">
                        signup
                        </button>
}
                        </div>
                    </form>
                    {error?
                    <p className="text-center p-1 text-red-600">{error}</p>
                    :null
}
                    <p className="text-center">OR</p>
                    <div className="flex justify-center">

                    <Link href="/login" className="text-black m-1">Have Account ?<span className="underline">Login</span> </Link>

                    </div>
              </div>
         </div>
            


    )
}
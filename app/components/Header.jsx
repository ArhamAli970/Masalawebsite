"use client"
// import LogoutIcon from '@mui/icons-material/Logout';
// import { cookies } from 'next/headers';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {useContext, useEffect, useState } from 'react';
import axios from "axios";
import { searchContext } from '../context/SearchContextProvider';
// import { searchContext } from '../context/';
// import { createContext } from '../context/Usecontext';


// import { useEffect, useState } from 'react';

export default function Header(){

    // const UserContext=useContext();// context created
    const path=usePathname();
    const rout=useRouter();
    // const [price,setPrice]=useState(0);
    const [user,setUser]=useState("");
    const[loading,setLoading]=useState(true);
//    const[search,setSearch]=useContext(searchContext);
const { search, setSearch } = useContext(searchContext);


    function fn(e){
        setSearch(e.target.value);
        // console.log(e.target.value);
    }

    useEffect(()=>{
       async function chkUser(){
        // console.log("ha ha ha...");
            await axios.get("/api/login")
            .then((res)=>{
                // console.log(res.data.name,"hi agaya new user");
                if(res.data.name){
                setUser(res.data.name);
                }
            })
            .catch((err)=>{
                console.log("errr")
            })
            .finally(()=>{
                setLoading(false);
            })
            
        }
        chkUser();
    },[path]);

   async function lout(){
       await axios.post("/api/logout"). 
       then((res)=>{
         if(res.data.data){
            setUser("");
            window.location.reload();
         }
       })
       .catch((err)=>{
        console.log(err.message);
       })
    }

    function goSign(){
        rout.push("/signup")
    }

    if(loading){return (
        <div className="flex h-24 bg-yellow-300 justify-between items-center">
        <div className="logo p-4">
            <h1 className='font-md text-2xl p-1 font-serif'>Loading...</h1>
        </div>
    </div>
    )}
    

    return(
        
        path=="/signup" || path=="/login" ?null:

        path=="/cart" ? <h1 className='p-2 text-center font-bold text-xl'>Cart</h1>:

        path=="/address"?<h1 className='p-2 text-center font-bold text-xl'>Details</h1>:

        <div className="flex h-24 bg-yellow-300 justify-between items-center ">
            <div className="logo p-4">
                <h1 className='font-md text-2xl p-1 font-serif'>Diya spices</h1>
            </div>
            <div className="sb w-1/2 flex justify-center">
                <input className="p-2 w-3/4 border-0 rounded-l-md" type="text" value={search} onChange={fn}  placeholder="Search Masale" />
                <button className="rounded-r-md p-2 bg-orange-300 ">Search</button>
            </div>
    
        
            <div className="lst flex justify-between">

            {
                !user?
            <div className="sl p-4">
                <button onClick={goSign} className='p-2 bg-green-400 rounded-md text-white font-medium'>SignIn</button>
            </div>
            :
            <div className="sl p-4">
                <button onClick={lout}  className='p-2 bg-red-400 rounded-md text-white font-medium'>Logout</button>
            </div>
            }

        

            </div>

            

        </div>
    )
}
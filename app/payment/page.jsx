"use client"
// import { useEffect } from "react";
import Bill from "../components/Bill";
// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Payment(){
    let dta={house:"",floor:"",area:"",near:"",code:"",name:"",num:""}
    const [add,setAdd]=useState(dta);
    const rout=useRouter();
    const[price,setPrice]=useState(0);
    const [load,setLoad]=useState(true)

   useEffect(()=>{
        async function data(){
            try{
           const res= await axios.get("/api/tokadd")
           if(res.data.data=="goroot"){
            rout.push("/login");
           }
           if(res.data.data=="add"){
            rout.push("/");
           }
            setAdd(res.data.data);
            setPrice(res.data.pr);
            console.log(res.data.data);
            setLoad(false);
            }
            catch(e){
                console.log(e);
            }
        }
        data();
   },[])

   if(load){
    return <h1>Loading...</h1>
   }

    return(
        <div className="flex justify-between" >

{/* pay */}
            <div className="flex-[60%]">


            </div>


{/* add */}
       <div className="flex-[30%]">
            <div className="border-2 border-black my-2 mx-4">
                <h1 className="text-gray-700 font-mono p-2 ">Delivery Address </h1>
                
                {
                add.length!=0?
                    <h1 className="text-xs p-2 font-mono text-gray-400">
                        
                        {add.name} {add.floor.length!=0?<>,{add.floor}</>:null}
                        ,{add.house},{add.area}{add.near.length!=0?<>,{add.near}</>:null},{add.code},{add.num} <br />

                    </h1>
                    :null
                }
                

                <div className="">
                    <h1 className="bg-gray-200 p-2 text-gray-500">My Cart</h1>                 
                </div>

                <div>
                    <Bill price={price}/>
                </div>

            </div>
            </div>

        </div>
    )
}
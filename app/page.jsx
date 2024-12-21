"use client"
import Image from "next/image";
import Button from "./components/Button";
import axios from "axios";
import Contain from "./components/Contain"
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { searchContext } from "./context/SearchContextProvider";




export default function Home() {
  // let spices=[{name:"red chilli powder",prices:90},{name:"caramdon powder",prices:80},{name:"spic",prices:50},{name:"green chilli",prices:110},{name:"oil",prices:150}];
const[spices,setSpices]=useState([]);
const rout=useRouter()
const[crt,setCrt]=useState([]);
const[price,setPrice]=useState(0);
const{search,setSearch}=useContext(searchContext)

  useEffect(()=>{
    async function data() {
      console.log(price);
      await axios.get("http://localhost:3000/api/alldata",{
                params:{search}
              })
      .then((res)=>{
           if(res.data.data){
            setSpices(res.data.data);
            if(res.data.crt){
              setCrt(res.data.crt);
            }}
           
    })  
      .catch((err)=>{
          console.log(err);
      })
       
    }
    data();
  },[search])



  function gotoPrd(){
   rout.push("/cart");

  }


 
  return (

    <div >

      <Contain price={price}/>

     <div className="all bg-white flex flex-wrap justify-around m-3">
          {
           spices && spices.map((ele,idx)=>{
             return( 
             <div  key={ele._id} className="ep m-2 rounded-md border-black border-2 flex-[49%] sm:flex-[31%]">
                    <div className="img h-48 flex justify-center items-center">
                      <p>this is iamge of item</p>
                    </div>  
                    <div className="dec">
                         <h1 className="capitalize text-md font-medium p-1" >{ele.name}</h1>
                        
                         <p className="px-2">{ele.quatity}&nbsp;&nbsp;{ele.mthd}</p>
                         <div className="prc p-1 flex justify-between m-1">
                             <p> <span className="text-xs"> &#x20b9;</span>{ele.price}</p>
                             <Button pid={ele._id} crt={crt}  setPrice={setPrice} Pprc={ele.price} price={price} />
                         </div>
                    </div>

              </div>
             )
            })
          }
     </div>

     </div>      
  );
}


 {/* <select name="size"  className="pr m-1" id="">
                          <option className="pr" value="100">100 g</option>
                          <option className="pr" value="250">250 g</option>
                          <option className="pr" value="500">500 g</option>
                          <option className="pr" value="1000">1 kg</option>
                         </select> */}
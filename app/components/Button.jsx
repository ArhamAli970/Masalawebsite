"use client"
// import data from "@/data";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Button(param){
  let setP=param.setPrice;

  let acPrice=param.Pprc
  
  const rout=useRouter();
  const pth=usePathname();
  const [cnt,setCnt]=useState(0);
  // const [acPrice,setAcPrice]=useState(0);
  // console.log(param); 
  useEffect(()=>{
    console.log(pth);
    if(pth=='/'){
      console.log("hello1",param.price)
    let prd=param.crt.filter((ele)=>{
          return ele.item._id==param.pid;
    })

    // setAcPrice(param.Pprc);

    if(prd.length!=0){
      // console.log(prd[0]);
       setCnt(prd[0].qty);
       setP((prev)=>prev+prd[0].item.price*prd[0].qty);
    }
  }   
  else if(pth=="/cart"){
    console.log("hello2",param.price)
    // console.log(param.qty,acPrice);
      setCnt(param.qty);
      setP((prev)=>prev+param.qty*acPrice);
      
  }
 
  },[]);

 
   


    async function sub(e,id){
      // console.log(id);
      // console.log(pth);
      e.stopPropagation();
            await axios.post("/api/rmvcart",
              
              {id:id}
              
            ) 
            .then((res)=>{
              if(res.data.data=="goroot"){
                rout.push("/login");
              }
              // console.log(res.data.data);
              if(res.data.data=="done"){
                setP(param.price-acPrice);
                setCnt(cnt-1);
                if(param.data && cnt-1<=0){
                    let newArr=param.data.filter((ele)=>{
                         return ele.item._id!=param.pid;
                    })
                    param.setData(newArr);
                }
              }
            })
            .catch((err)=>{
              console.log(err.message);
            })
        }


   async function add(e,id){
    // console.log(id);
    e.stopPropagation()
          await axios.post("/api/addcart",
            
            {id:id}
            
          )
          .then((res)=>{
            if(res.data.data=="goroot"){
              rout.push("/login");
            }
            // console.log(res.data.data);
            if(res.data.data=="done"){
              setP(param.price+acPrice);
              setCnt(cnt+1);
            }
          })
          .catch((err)=>{
            console.log("err");
          })
      }
      
    return(
      
        cnt==0?
        <button  onClick={(e)=>{add(e,param.pid)}} className="bg-green-100 px-5 py-2 rounded-md text-green-600  font-semibold text-sm">Add</button>
        :
        <button onClick={(e)=>{e.stopPropagation()}} className="bg-green-600  flex justify-center items-center px-[0.620rem] py-[0.129rem] rounded-md border-2 border-green-600 font-semibold text-sm">
    <div onClick={(e) => { sub(e,param.pid); }} className="font-bold text-lg z-10 text-white cursor-pointer">-</div>
    <span className="px-2 text-white">{cnt}</span>
    <div onClick={(e) => { add(e,param.pid); }} className="font-bold text-lg  text-white cursor-pointer">+</div>
</button>
        // <button className="bg-green-600 diplay-flex
        // justify-center items-center px-[0.620rem] py-[0.129rem] rounded-md border-2 border-green-600 font-semibold text-sm">

        //     <button onClick={()=>{sub(par.pid)}} className=" font-bold text-lg text-white ">-</button>
        //     <span className="px-2 text-white">{cnt}</span>
        //     <button onClick={()=>{add(par.pid)}} className=" font-bold text-base text-white">+</button>
        // </button>
    )
}   
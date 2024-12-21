// import { FunctionsSharp } from "@mui/icons-material";
"use client"
import axios from "axios";
import { useEffect, useState } from "react"
import Button from "../components/Button";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

import Price from "../components/Price";

export default function Cart(){
    const[data,setData]=useState([]);
    const[nLogin,setNlogin]=useState(false);
    const[price,setPrice]=useState(0);
    // const rout=useRouter();

   
    // const rout=useRouter();

    useEffect(()=>{
        async function data() {
          await axios.get("http://localhost:3000/api/getcart")
          .then((res)=>{
                if(res.data.data!="not verify"){
                    // console.log(res.data.data);
                  setData(res.data.data);
                }else{
                    setNlogin(true)
                }
            })
          .catch((err)=>{
              console.log(err);
          })
           
        }
        data();
      },[])

    return(
        <>
        {
            
        nLogin
        ?
        <div className="grow">not verify</div>
        : 
        <div className="grow flex  justify-between ">
                <div className="flex-[60%] border-yellow-100 border-2 rounded-xl bg-white ">
                    <div className="shw">

                        {
                            data && data.map((ele)=>{
                                return(
                                  <div key={ele._id} className="flex justify-between p-2">
                                    <div className="flex">
                                        <div className="flex justify-center  items-center border-2">
                                            <p>image here</p>
                                        </div>  
                                        <div className="p-2">
                                            <h1 className="text-sm capitalize font-normal">{ele.item.name}</h1>
                                            <h1 className="text-xs font-semibold text-gray-600 ">{ele.item.quatity} {ele.item.mthd}</h1>
                                            <h1 className="text-sm font-semibold">&#8377;{ele.item.price} </h1>
                                        </div>
                                    </div>
                                    <div>
                                      <Button setData={setData} data={data} pid={ele.item._id} Pprc={ele.item.price} qty={ele.qty} setPrice={setPrice} price={price} />
                                    </div>
                                  </div>    
                                )
                            })
                        }

                    </div>
                </div>

                <Price price={price} />
                {/* <div className="flex-[35%]  border-2  border-yellow-100  bg-white rounded-xl">
                    <h1 className="font-bold text-base">Bill Details</h1>

                    <div className="flex flex-col my-1 justify-between">
                          
                          <div className="flx">
                             <div>
                                <h1 className="cp">
                                  <ListAltIcon fontSize="small"/>
                                   Items total</h1>
                             </div>
                             <div className="cp">&#x20b9;{price}</div>
                          </div>

                          <div className="flx">
                            <div>
                                <h1 className="cp">
                                   <PedalBikeIcon fontSize="small"/>
                                  Delivery charge</h1>
                            </div>
                            <div className="cp">&#x20b9;15</div>
                          </div>

                          <div className="flx">
                            <div>
                                <h1 className="cp">
                                  <ShoppingBagIcon fontSize="small"/>
                                  Handling charge</h1>
                            </div>
                            <div className="cp">&#x20b9;10</div>
                          </div>

                          <div className="flx">
                            <div>
                                <h1 className="font-semibold font-sm">Grand total</h1>
                            </div>
                            <div className="font-semibold font-sm">&#x20b9;{price+5+10}</div>
                          </div>


                    </div>

                    <div className="cnc rounded-xl border-[2px] border-yellow-100">
                        <h1 className="font-bold text-red-300 text-md p-1">Cancellation Policy</h1>
                        <p className="text-xs p-1 font-light rounded-xl">Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.</p>
                    </div>

                    <div className="flex my-2 mx-1 justify-center items-center">
                      <button onClick={goAdd} className="bg-green-500 grow px-4 py-2 font-bold text-xl rounded-xl  text-white">Proceed &rarr;</button>
  
                    </div>

                </div> */}
         </div>
         
        }
        </>
    )
}
// "use client"
// import { useEffect, useState } from "react"

import { useRouter } from "next/navigation";

export default function Contain(par){
    const rout=useRouter();
let price=par.price;

function fun(){
    rout.push("/cart");
}

    return(
        
        <div onClick={fun}  style={{display:price>0?"flex":"none"}}  className="bg-green-400 flex justify-between items-center  rounded-md p-3 fixed bottom-4 left-[10%] w-[80%] hover:bg-green-500 hover:cursor-pointer ">
             <div  className="text-white font-bold">{price} &#8377; </div>
            <div className="text-white font-bold">Go to Cart &#8594; </div>
           
        </div>
    )
}
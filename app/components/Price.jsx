"use client"

import Pybut from './pyBut';
import { usePathname } from 'next/navigation';
import Bill from './Bill';

export default function Price(prop){
    const price=prop.price;
    const path=usePathname();
    // console.log(path);

  
    return(
        <div className="flex-[35%]  border-2  border-yellow-100  bg-white rounded-xl">
                    <h1 className="font-bold text-base">Bill Details</h1>

                   

                    <Bill price={price}/>

                    <div className="cnc rounded-xl border-[2px] border-yellow-100">
                        <h1 className="font-bold text-red-300 text-md p-1">Cancellation Policy</h1>
                        <p className="text-xs p-1 font-light rounded-xl">Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.</p>
                    </div>

                    {
                      path=="/address"?null:
                    <div className="flex my-2 mx-1 justify-center items-center">
                      <Pybut/>
                    </div>

}

               {/* = */}



                </div>
    )
}
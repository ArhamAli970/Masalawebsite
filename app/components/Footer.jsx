// import { dialogClasses } from "@mui/material";
"use client"
import { usePathname } from "next/navigation"

export default function Footer(){
    const path=usePathname();
    return(
        path=="/login" ||  path=="/signup"?null:
        <div className="ft bg-yellow-300 flex flex-col  justify-center items-center">
            <h1 className="font-serif text-xl font-bold p-2">Diya Spices Private Limited</h1>
            <p className="p-2 text-lg">Contact us: 993492</p>
            <p className="p-1 text-sm"> <span>&#169;</span> Diya spices private Limited</p>
        </div>
    )
}
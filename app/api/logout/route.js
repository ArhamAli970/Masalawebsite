import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"


export async function POST(req){
   // let tok=await req.cookies.get("token");
   if(!req.cookies.has("token")){
     return NextResponse.json({data:"alreadylout"})
   }
   let resp=NextResponse.json({
      data:"log out succesfull"
   })

   resp.cookies.delete("token");
   return resp;

}
import Cart from "@/models/cart";
import main from "@/libs/connect";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"
import Prod from "@/models/product";





export async function GET(req){
    await main();
   
    if(!req.cookies.has("token")){
        return NextResponse.json({data:"not verify"})
    }

    const token=req.cookies.get("token")?.value;

    const chkId=jwt.verify(token,process.env.TOKEN);

    const prd=await Cart.findOne({user:chkId.id}).populate("cart.item");

  

    const crt=prd.cart;
    // console.log(crt);

    return NextResponse.json({data:crt});


}
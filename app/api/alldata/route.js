// import Prod from "@/models/product";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import Cart from "@/models/cart";
import main from "@/libs/connect";
import Prod from "@/models/product";

export async function GET(req){
    console.log("ehel");
    await main();
    // const data=await Prod.find({}); 
    let query=req.nextUrl.searchParams.get("search");
    let data=[];
    if(query.length>0){
        data=await Prod.find({name: { $regex: query, $options: "i" }, 
        })
    }
    // console.log(query);
    else{
        data=await Prod.find({});
    }
    // return NextResponse.json({data:data})


    if(!req.cookies.has("token")){
        return NextResponse.json({data});  
    }


    const token=req.cookies.get("token")?.value;
  
    const chkId=jwt.verify(token,process.env.TOKEN);
 
    const prd=await Cart.findOne({user:chkId.id}).populate("cart.item");
  

    const crt=prd.cart;

    return NextResponse.json({crt:crt,data:data});
}





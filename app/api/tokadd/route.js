import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import Address from "@/models/address";
import Cart from "@/models/cart";
// import { NextResponse } from "next/server";


export async function GET(req) {
    // console.log("eys")
    if(!req.cookies.has("token")){
        return NextResponse.json({data:"goroot"})
    }

    if(!req.cookies.has("addressId")){
        return NextResponse.json({data:"add"})
    }

    const id=req.cookies.get("addressId")?.value;
    const token=req.cookies.get("token").value;

    try {
        // Verify the token
        const userId = jwt.verify(token, process.env.TOKEN);
        // console.log("User ID:", userId);

        let data= await Address.findOne({user:userId.id})
    
        let curr=data.addresses.filter((ele)=>{
            return ele._id==id
        })
        // console.log(curr[0]);

        const prd=await Cart.findOne({user:userId.id}).populate("cart.item");
        const crt=prd.cart;
    // console.log(crt);
          let amt=crt.reduce((sum,ele)=>{
            return sum+(ele.qty*ele.item.price);
          },0)

    
        return NextResponse.json({data:curr[0],pr:amt});

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({data:"goroot"})
    }
}
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import Cart from "@/models/cart";


export async function POST(req){
  
    // console.log("dfdffff")

    if(!req.cookies.has("token")){
        return NextResponse.json({data:"goroot"})
    }

    let {id}=await req.json();
    let token=req.cookies.get("token")?.value;

    let userId=jwt.verify(token,process.env.TOKEN);

    // await Cart.findOneAndUpdate({user:userId.id})

    const cart = await Cart.findOneAndUpdate(
        { user: userId.id, 'cart.item': id },  // Check if product exists in cart
        { $inc: { 'cart.$.qty': 1 } },  // If exists, increment qty by 1
        { new: true }  // Return the updated document
      );
  
      // If product doesn't exist, push it into the cart with qty: 1
      if (!cart) {
        await Cart.findOneAndUpdate(
          { user: userId.id },  // Find user by userId
          {
            $push: { cart: { item: id, qty: 1 } }  // Add new product with qty 1
          },
          { new: true }
        );
      }



    return NextResponse.json({data:"done"})
    
}
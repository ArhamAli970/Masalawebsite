
import main from "@/libs/connect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import Cart from "@/models/cart";
import Address from "@/models/address";


main();
export async function POST(req){
    try{
       let data=await req.json();
        
       const {email,password,number}=data;  
       let getDet=await User.findOne({email:email});

       if(email.length==0  || number.length==0  ){
        return NextResponse.json({data:"Provide Valid Info"});
    }

    if(password.length<6){
        return NextResponse.json({data:"Password must have atleast length 6"});
    }

       if(getDet){
        return NextResponse.json({data:"Existing User"});
       }
       console.log(email)
       const hash=await bcrypt.genSalt(10)
       const hashPassword = await bcrypt.hash(password,hash);

    //    console.log(hashPassword)

       const newUser=new User({
        email:email,
        password:hashPassword,
        number:number
       })
       let user =await newUser.save();

       console.log(user._id);
       const newCart=new Cart({
        user:user._id,
        cart:[]
       })

       const newAdd=new Address({
          user:user._id,
          addresses:[]
       })
       

       await newCart.save();
       await newAdd.save();
      

       return NextResponse.json({data:"done"});
       

    }   
    catch(err){
        return NextResponse.json({error:err.message},{status:500})
    }
}
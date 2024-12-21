
import main from "@/libs/connect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"


main();

export async function GET(req){

    if(!req.cookies.has("token")){
        return NextResponse.json({name:""})
    }

    const token=req.cookies.get("token").value;
   
    // console.log("ye hai tooooeek",token);
    const veri=jwt.verify(token,process.env.TOKEN);
    console.log(veri.id);
    
    // onsole.log("hallo",token)
    return NextResponse.json({name:veri.id})
}


export async function POST(req){
    try{
       let data=await req.json();
        
       const {email,password}=data;  
       let getDet=await User.findOne({email:email});

        //mail
       if(!getDet){
        return NextResponse.json({data:"No User Exist"});
       }

       //password
       const chkPass=await bcrypt.compare(password,getDet.password);

    //    console.log(chkPass);

       if(!chkPass){
        return NextResponse.json({data:"Password wrong"});
       }

       // now we make token data

       const tokenData={
        id:getDet._id,
        email:email
        }


      const token=await jwt.sign(tokenData,process.env.TOKEN,{expiresIn:"1d"})
       const Resp= NextResponse.json({data:"Login Success"});
       Resp.cookies.set("token",token ,{
        httpOnly:true
       })

       return Resp;
     

    }   
    catch(err){
        return NextResponse.json({error:err.message},{status:500})
    }
}
// import { RedirectType } from "next/navigation";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import Address from "@/models/address";
import main from "@/libs/connect";
import mongoose from "mongoose";

main()


export async function GET(req) {

    if(!req.cookies.has("token")){
        return NextResponse.json({data:"home"})
    }

    const token=req.cookies.get("token")?.value;
    const tok="diyamasala"
    const user=jwt.verify(token,tok);

    let data=await Address.find({user:user.id})

    // console.log(data);
    // console.log(data[0].addresses);

    return NextResponse.json({data:data[0].addresses});
}


export async function POST(req){
    // console.log("hello")
    let frm=await req.json();

    if(!req.cookies.has("token")){
        return NextResponse.json({data:"home"})
    }

    const token=req.cookies.get("token")?.value;
    const tok="diyamasala"

    const user=jwt.verify(token,tok);

    // let add=new Address({user:user.id,addresses:[frm]});

    // await add.save();
    console.log(frm);
    console.log(user.id);
    const objectId =new mongoose.Types.ObjectId(user.id);
    console.log(objectId)

    let newAdd =await Address.findOneAndUpdate(
        {user:objectId},
        {$push:{addresses:frm}}
        ,{new:true}
    )

    console.log(newAdd);

    return NextResponse.json({data:newAdd.addresses});
}


export async function PUT(req){

    // console.log(req.body);



    let frm=await req.json();
    console.log(frm);

    
    if(!req.cookies.has("token")){
        return NextResponse.json({data:"home"})
    }

    const token=req.cookies.get("token")?.value;



    const user=jwt.verify(token,process.env.TOKEN);
    console.log(user.id);

    let dat=await Address.findOneAndUpdate(
        {user:user.id,"addresses._id":frm._id},
        {$set:{
            "addresses.$.house":frm.house,
            "addresses.$.floor":frm.floor,
            "addresses.$.area":frm.area,
            "addresses.$.near":frm.near,
            "addresses.$.code":frm.code,
            "addresses.$.name":frm.name,
            "addresses.$.num":frm.num,
            // "addresses.$.floor":frm.floor,

        }}
        ,{new:true}
    )


    // console.log(dat);



    return NextResponse.json({data:"update"});
    
}
import main from "@/libs/connect";
import Address from "@/models/address";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";


main();
export async function GET(req){
    // console.log("hhh",req.query)
    let id=req.nextUrl.searchParams.get('id');
    // console.log(id,"er");
// console.log("eys")
    if(!req.cookies.has("token")){
        return NextResponse.json({data:"goroot"})
    }

    const token=req.cookies.get("token").value;
    const userId=jwt.verify(token,process.env.TOKEN);

    // console.log(userId.id);
    let data=await Address.findOne(
        {user:userId.id},
        // {"addresses._id":id}
    );
    // console.log(data);

    let curr=data.addresses.filter((ele)=>{
        return ele._id==id;
    })

    // console.log(curr);


    return NextResponse.json({data:curr[0]});
}
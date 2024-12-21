// import { PrintDisabled } from "@mui/icons-material";
import main from "@/libs/connect";
import Prod from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

main();
export async function GET(req){
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
    
    return NextResponse.json({data})
}
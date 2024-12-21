// const { default: mongoose } = require("mongoose");

// import { Schema } from "@mui/icons-material"
import mongoose from "mongoose"

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    ,
    cart:[{
          item:{type:mongoose.Schema.Types.ObjectId,
            ref:"Prod"
          },
          qty:Number
    }]
})

let Cart=mongoose.models.Cart || mongoose.model("Cart",cartSchema);

export default Cart;
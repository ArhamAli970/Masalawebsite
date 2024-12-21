// const { default: mongoose } = require("mongoose");
import mongoose from "mongoose"

const prodSchema=new mongoose.Schema({
   name:String,
   url:String,
   quatity:String,
   mthd:String,
   price:Number,
})

const Prod=mongoose.models.Prod || mongoose.model("Prod",prodSchema);

export default Prod;
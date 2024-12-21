
// import Prod from '@/models/product';
const Prod = require("../models/product"); // Adjust the path accordingly

const data=require('../data.js')
// const 
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/diya');

}

// main();

 async function fun(){
  await Prod.deleteMany({});
  console.log(data);
  await Prod.insertMany(data);
//   console.log("data init");
  await newData.save();
}

// fun();
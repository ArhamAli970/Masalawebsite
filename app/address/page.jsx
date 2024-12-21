"use client"
import { useSearchParams } from "next/navigation";
import Price from "../components/Price";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { useRouter } from "next/navigation";
import EditFrm from "../components/EditFrm";
import { useQuery } from "@tanstack/react-query";
import HomeIcon from '@mui/icons-material/Home';
import { Book } from "@mui/icons-material";
// import { FmdBad } from "@mui/icons-material";\=-]0p9o8i7u6jfrwdq a


export default function MapAddress(){
    let dta={house:"",floor:"",area:"",near:"",code:"",name:"",num:""}
    let par=useSearchParams();
    const rout=useRouter();
    // const price=parseInt(par.get("price"));
    const[frm,setFrm]=useState(dta);
    // const[add,setAdd]=useState([]);

    const[Id,setId]=useState("");
    const[showFrm,setShowFrm]=useState(false);


    const[price,setPrice]=useState(0);
    // const [load,setLoad]=useState(true)

   useEffect(()=>{
        async function data(){
            try{
           const res= await axios.get("/api/tokadd")
           if(res.data.data=="goroot"){
            rout.push("/login");
           }
           else if(res.data.data=="add"){
            rout.push("/");
           }
            setPrice(res.data.pr);
           
            }
            catch(e){
                console.log(e);
            }
        }
        data();
   },[])




    const {data,isLoading}=useQuery({
        queryKey:['add'],
        queryFn:async()=>{
            try{
                            let res=await axios.get("/api/address")
                               if(res.data.data){
                                return res.data.data;
                               }
                            }
                            catch(e){
                                console.log(e.message);
                            }
        }
        ,
        // enabled:isTa
        refetchOnWindowFocus:false
    })




    function fn(e){
        // console.log(e.target.value)
        // console.log(e.target.name)
        setFrm({...frm,[e.target.name]:e.target.value})
    }

    async function clk(e){
        e.preventDefault();
        if(frm.house.length==0 ||frm.area.length==0 || frm.name.length==0 || frm.num.length==0 ||frm.code.length==0){return;}

        try{
        let res=await axios.post("/api/address",frm)
           if(res.data.data){
               setFrm(data);
               setAdd(res.data.data);

           }
        }
        catch(e){
            console.log(e.message);
        }


    }

    function edit(id){
        setId(id);
        // console.log(id);
        setShowFrm(true);
    }

    function fnok(id){
        document.cookie = `addressId=${id}; path=/; max-age=${60 * 60 * 24};`; 
     rout.push("/payment")
    }




    return(

    <div className={showFrm?"overflow-hidden":null}>

        <div className="flex">
           

            <div className="flex-[45%] border-2  border-yellow-100  bg-white rounded-xl">

                <h1 className="font-bold text-xl">add newAddress</h1>
                <form className="flex flex-col justify-between items-center px-4 py-16">
                     <input className="fld" type="text" name="house" onChange={fn} value={frm.house} placeholder="Flat/House no *"  required />
                     <input className="fld" type="text" name="floor" onChange={fn} value={frm.floor}  placeholder="Floor "/>
                     <input className="fld" type="text" name="area" onChange={fn}  value={frm.area}  placeholder=" Area *" required/>
                     <input className="fld" type="text" name="code" onChange={fn}  value={frm.code}  placeholder=" Pin Code*" required/>
                     <input className="fld" type="text" name="near" onChange={fn} value={frm.near}   placeholder="Near Landmark "/>

                     <h1>Enter your details for seamless delivery experience</h1>
                     <input className="fld" type="text" name="name" onChange={fn} value={frm.name}  placeholder="Name *" required />
                     <input className="fld" type="text" name="num" onChange={fn} value={frm.num}  placeholder="Phone no *" required/>

                     <button onClick={clk} className="bg-green-700 grow px-4 py-2 font-semibold text-md rounded-xl  text-white">Add Address</button>
                </form>

            </div>

            <Price price={price}/>


        </div>

        <div>
            <h1 className="flex justify-center items-center p-2 font-bold text-2xl">Select Address</h1>
        </div>

        <div className="my-2 mx-6 flex flex-wrap">

            {
              isLoading?<h1>data Loading..</h1> : data.map((e,idx)=>{

                    return(
                    <div className="flex flex-[45%] my-2  border-black border-2 mx-3 my-1 rounded-xl p-4 hover:bg-gray-100 " id={e._id} key={e._id}   >

                        <div className="flex-[20%] flex items-center justify-center">
                        {/* <input  type="radio" name="add" id={idx}/> */}
                        <HomeIcon/>
                        </div>
                        <label className="flex-[70%] cursor-pointer">
                            <div onClick={()=>fnok(e._id)}   className="p-6 ">
                                {e.name}&nbsp;, 
                                {e.house} &nbsp;,
                             {e.floor.length>0?<>{e.floor}&nbsp;,</> :null}
                                {e.area}&nbsp;
                                {e.code}&nbsp;, 
                                {e.near.length>0?<>{e.near}&nbsp;,</> :null}
                                {e.num}
                            </div>

                        </label>


                        <div className="flex flex-[2%] justify-center">
                            <button onClick={()=>{edit(e._id)}}>
                            <EditIcon/>
                            </button>
                        </div>

                      
                    </div>
                    )
                })
            }
       

        </div>

        {
        showFrm?
        <>
        <EditFrm id={Id} setfrm={setShowFrm}  />
        
        </>
        :null
        }



    </div>

    )
}



    // useEffect(()=>{

    //     async function data() {

    //         try{
    //             let res=await axios.get("/api/address")
    //                if(res.data.data){
    //                 // console.log(res.data.data);
    //                    setAdd(res.data.data);
    //                }
    //             }
    //             catch(e){
    //                 console.log(e.message);
    //             }
            
    //     }

    //     data();
        
    // },[]);
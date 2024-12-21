// "use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function EditFrm(props){
  const  queryClient=useQueryClient();
  const rout=useRouter();
    // console.log(props.id);
    const [formData, setFormData] = useState({
        house: '',
        floor: '',
        area: '',
        near: '',
        code: '',
        name: '',
        num: '',
      });
  // Initial form state with the provided fields

  useEffect(()=>{
    async function get() {
        console.log(props.id,"jjmm");
        try{
            const res=await axios.get("/api/add",
                {
                    params:{
                        id:props.id
                    }
                })


                if(res.data.data=="goroot"){
                   rout.push("/login");
                }

                setFormData(res.data.data);
            
               
            }
            catch(e){
                console.log(e);
            }
    }
    get();
  },[props.id])


//   console.log(props);
  

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const mutation=useMutation({
    mutationFn:async(newData)=>{
      
        const res= await axios.put("/api/address",newData)
        // if(res.data.data){
        //  console.log("agaye",res.data.data);
        //  if(res.data.data=="update"){
           
        //  }
        // }
    },
    onSuccess:()=>{
          props.setfrm(false);
           console.log("hpda update")
           queryClient.invalidateQueries('add', {
            exact: true, // Ensures it's the correct query being invalidated
          });
          
          // Force refetch after invalidation
          queryClient.refetchQueries('add');
    },
    onError:(e)=>{
      console.log(e);
    }
  })

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    mutation.mutate(formData);
    // Add your submission logic here (e.g., API call)
  };

  return (
    <div className="p-6 max-w-4xl mx-auto fixed bg-white z-10 top-[20%] left-[10%] rounded-xl border-2 border-black">
      <div className='flex justify-between'>
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Address </h2>
      <span onClick={()=>{props.setfrm(false)}}
        className='hover:cursor-pointer'><CloseIcon/></span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <input
          type="text"
          name="house"
          value={formData.house}
          onChange={handleChange}
          placeholder="House"
          className="border border-gray-300 p-2 rounded w-1/4"
        />
        <input
          type="text"
          name="floor"
          value={formData.floor}
          onChange={handleChange}
          placeholder="Floor"
          className="border border-gray-300 p-2 rounded w-1/4"
        />
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area"
          className="border border-gray-300 p-2 rounded w-1/4"
        />
        <input
          type="text"
          name="near"
          value={formData.near}
          onChange={handleChange}
          placeholder="Near"
          className="border border-gray-300 p-2 rounded w-1/4"
        />
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Code"
          className="border border-gray-300 p-2 rounded w-1/4"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border border-gray-300 p-2 rounded w-1/4"
        />
        <input
          type="text"
          name="num"
          value={formData.num}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border border-gray-300 p-2 rounded w-1/4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
};


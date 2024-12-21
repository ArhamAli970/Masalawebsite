
import { useRouter } from "next/navigation";

export default function Pybut(props){
    const rout=useRouter();
    // const price=props.price;

    function goAdd(){
        rout.push("/address");
    }
    return(
        <button onClick={goAdd} className="bg-green-500 grow px-4 py-2 font-bold text-xl rounded-xl  text-white">Proceed &rarr;</button>
    )
}
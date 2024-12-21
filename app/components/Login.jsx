"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
    let init = { email: "", password: "" }
    const [data, setData] = useState(init);
    const [disable, setDisable] = useState(true);
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false);

    const rout = useRouter();

    useEffect(() => {
        if (data.email.length === 0 || data.password.length === 0) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [data]);

    function call(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function sign(e) {
        e.preventDefault();
        await axios.post("/api/login", data)
            .then((res) => {
                if (res.data.data === "Login Success") {
                    console.log("login hua");
                    rout.push("/");
                } else {
                    setError(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <div className="frm flex-1">
            <div className="sup border-2 border-black rounded-md sm:w-1/2 p-4">
                <h1 className="lg">LogIn</h1>
                <form onSubmit={sign}>
                    <div className="ema com">
                        <input className="bx" type="text" value={data.email} onChange={call} name="email" placeholder="Enter Email" />
                    </div>
                    <div className="pass com relative">
                        <input className="bx" type={showPass ? "text" : "password"} value={data.password} onChange={call} name="password" placeholder="Enter Password" />
                        <span
                            className="absolute right-[15%] top-[0.76rem] cursor-pointer"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {!showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </span>
                    </div>
                    <div className="com m-1">
                        {!disable ?
                            <button type="submit" className="border-2 border-black text-white bg-black rounded-md p-2 w-1/2">
                                Login
                            </button>
                            :
                            <button type="button" className="border-2 border-gray text-black font-bold bg-gray rounded-md p-2 w-1/2" disabled>
                                Login
                            </button>
                        }
                    </div>
                </form>
                {error && <p className="text-center p-1 text-red-600">{error}</p>}
                <p className="text-center">OR</p>
                <div className="flex justify-center">
                    <Link href="/signup" className="text-black m-1">Don't Have Account? <span className="underline">Sign Up</span></Link>
                </div>
            </div>
        </div>
    );
}

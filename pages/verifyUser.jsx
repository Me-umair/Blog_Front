import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

function VerifyUser() {
    let {token} = useParams();
    console.log(token)
    async function sendtoken() {
        try {
            let res = await axios.post(`${import.meta.env.VITE_API}/api/v1/verify/${token}`)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        sendtoken()
    },[])
  return (
    <div>
        <h1>User is verified.</h1>
    </div>
  )
}

export default VerifyUser
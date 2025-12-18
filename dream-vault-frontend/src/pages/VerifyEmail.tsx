// import style from "./VerifyEmail.module.css"
import { FRONTEND_URL, API_URL } from "../config"
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function VerifyEmail(){
    const [params] = useSearchParams();
    const token = params.get("token");

    const verification_url = API_URL + "/routes/verify-email";

    useEffect(()=>{
        if(!token){
            console.error("TOKEN NOT FOUND IN VERIFY EMAIL");
        }else{
            console.log("Token found, checking validation");
            checkValidation();
        }
        
    }, []);


    async function checkValidation(){
        const response = await fetch(verification_url, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }), 
        });
        console.log("CHECK VALIDATION RESPONSE:", response);
    }

    return(
        <div>Verifying email...</div>
    )   
}
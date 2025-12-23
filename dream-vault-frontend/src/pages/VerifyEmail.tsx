// import style from "./VerifyEmail.module.css"
import { API_URL } from "../config"
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export default function VerifyEmail(){
    const [params] = useSearchParams();
    const token_id = params.get("id");
    const token = params.get("token");
    const navigate = useNavigate();

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
            body: JSON.stringify({ id: token_id, token }), 
        });
        if(response.status === 200){
            navigate('/');
        }else{
            console.error("Error validating");
            navigate('/register');
        }
        
    }

    return(
        <div>Verifying account...</div>
    )   
}
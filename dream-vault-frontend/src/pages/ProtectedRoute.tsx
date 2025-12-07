import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { API_URL } from "../config";


export default function ProtectedRoute({ children }: { children: React.ReactNode }){
    const [tokenIsValid, setTokenIsValid] = useState<boolean | null>(null);

    useEffect(()=>{
        const tokenIsValid = async() => {
            const res_url = API_URL + "/routes/verify"
            const res = await fetch(res_url, {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json();

            if (res.ok && data.success){
                setTokenIsValid(true);
            }else{
                setTokenIsValid(false);
                console.error("Token failed to validate");
            }
        };
        tokenIsValid();
    });

    if ( !tokenIsValid ){
        console.error("Error moving to site. Rerouting to login.");
        return <Navigate to="/login" state={{ message: "Please log in to access this page." }} replace/>
    }

    return children;
}
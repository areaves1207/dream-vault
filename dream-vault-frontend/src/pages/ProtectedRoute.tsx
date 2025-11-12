import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"


export default function ProtectedRoute({ children }: { children: React.ReactNode }){
    const [tokenIsValid, setTokenIsValid] = useState<boolean | null>(null);

    useEffect(()=>{
        const tokenIsValid = async() => {
            const res = await fetch("http://localhost:3000/routes/verify",{
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await res.json();

            if (res.ok && data.success){
                setTokenIsValid(true);
            }else{
                setTokenIsValid(false);
            }
        };
        tokenIsValid();
    });

    if( tokenIsValid == null ){
        return <div>...Loading...</div>
    }

    if ( !tokenIsValid ){
        console.error("Error moving to site. Rerouting to login.");
        return <Navigate to="/login" state={{ message: "Please log in to access this page." }} replace/>
    }

    return children;
}
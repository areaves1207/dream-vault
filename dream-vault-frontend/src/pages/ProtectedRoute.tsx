import React from "react"
import { Navigate } from "react-router-dom"


export default function ProtectedRoute({ children }: { children: React.ReactNode }){
    const token = document.cookie.includes("jwt=");

    if(!token){
        console.error("NO JWT FOUND")
        return <Navigate to="/login" state={{ message: "Please log in to access this page." }} replace/>
    }

    return children;
}
import { useNavigate } from "react-router-dom";
import { Children, useState } from "react";
import { Link } from "react-router-dom";
import style from "./LoginForm.module.css"


export default function InputForm(props: {children?: React.ReactNode, titleText: string, targeturl: string, infoText: string, urlText: string, linkurl: string}){
    const { children, titleText, targeturl, infoText, urlText, linkurl } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        const response = await fetch(targeturl, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }), 
        });

        if (response.ok) {
            navigate("/");
            setEmail("");
            setPassword("");
        } else {
            const errorData = await response.json();
            alert(errorData.error || "Login failed");
        }

    }

    return(
    <div className={style.loginForm}>
        <form className={style.form} onSubmit={handleSubmit} method="post">
            <div className={style.children}>{children}</div>
            <p className={style.title}>{titleText}</p>

            <p>{infoText}</p>
            <Link to={linkurl}>{urlText}</Link>

            <label className={style.label}>Email:</label>
            <input className={style.input} type="email" placeholder="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
            <br></br>
            <label className={style.label}>Password:</label>
            <input className={style.input} type="password" placeholder="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} required/><br></br>
            <input className={style.login} type="submit" value="Login"/>
        </form>
    </div>
    )
}
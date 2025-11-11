import style from "./Login.module.css"
import InputForm from "../components/InputForm"
import { useLocation } from "react-router-dom";


export default function Login(){
    const location = useLocation();
    const message = location.state?.message

    return(
        
        <div className={style.login}>
            <InputForm targeturl="http://localhost:3000/routes/login" titleText="Login to your dreamvault account"></InputForm>
            {message && <div className={style.error}>
                {message}
            </div>}
        </div>
    )   
}
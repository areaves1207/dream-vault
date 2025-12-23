import style from "./Register.module.css"
import InputForm from "../components/InputForm"
import { FRONTEND_URL, API_URL } from "../config"
import StarsBackground from "../components/StarsBackground";

export default function Login(){
    const target_url = API_URL + "/routes/register";
    const link_url = FRONTEND_URL + "/login";
    return(
        <div className={style.login}>
            <InputForm 
                targeturl={target_url}
                titleText="Register for a dreamvault account"
                infoText="Already have an account?"
                urlText="Login here!"
                linkurl={link_url}>
            </InputForm>
            <StarsBackground/>
        </div>
    )   
}
import style from "./Register.module.css"
import InputForm from "../components/InputForm"
import { API_URL } from "../config"

export default function Login(){
    const target_url = API_URL + "/routes/register";
    const link_url = API_URL + "/login";
    return(
        <div className={style.login}>
            <InputForm 
                targeturl={target_url}
                titleText="Register for a dreamvault account"
                infoText="Already have an account?"
                urlText="Login here!"
                linkurl={link_url}>
            </InputForm>
        </div>
    )   
}
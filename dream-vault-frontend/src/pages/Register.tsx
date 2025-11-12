import style from "./Register.module.css"
import InputForm from "../components/InputForm"

export default function Login(){
    return(
        <div className={style.login}>
            <InputForm 
                targeturl="http://localhost:3000/routes/register" 
                titleText="Register for a dreamvault account"
                infoText="Already have an account?"
                urlText="Login here!"
                linkurl="http://localhost:5173/login">
            </InputForm>
        </div>
    )   
}
import style from "./Login.module.css"
import InputForm from "../components/LoginForm"

export default function Login(){
    return(
        <div className={style.login}>
            <InputForm titleText="Register for a dreamvault account"></InputForm>
        </div>
    )   
}
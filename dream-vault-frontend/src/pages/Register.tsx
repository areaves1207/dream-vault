import style from "./Register.module.css"
import InputForm from "../components/InputForm"

export default function Login(){
    return(
        <div className={style.login}>
            <InputForm titleText="Register for a dreamvault account"></InputForm>
        </div>
    )   
}
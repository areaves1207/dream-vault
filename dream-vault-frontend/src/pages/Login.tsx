import style from "./Login.module.css"
import InputForm from "../components/InputForm"

export default function Login(){
    return(
        <div className={style.login}>
            <InputForm titleText="Login to your dreamvault account"></InputForm>
        </div>
    )   
}
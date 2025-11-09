import style from "./Login.module.css"
import LoginForm from "../components/LoginForm"

export default function Login(){
    return(
        <div className={style.login}>
            <LoginForm></LoginForm>
        </div>
    )   
}
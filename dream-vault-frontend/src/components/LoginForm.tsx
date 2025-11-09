import style from "./LoginForm.module.css"

export default function LoginForm(){
    return(
    <div className={style.loginForm}>
        <form className={style.form} action="/submit_login" method="post">
            <label>Email:</label> <br></br>
            <input type="email" placeholder="email" id="email" name="email" required/>
            <br></br>
            <label>Password:</label><br></br>
            <input type="password" placeholder="password" id="password" name="password" required/><br></br>
            <input type="submit" value="Login"/>
        </form>
    </div>
    )
}
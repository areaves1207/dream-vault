import style from "./LoginForm.module.css"


export default function InputForm(props: {titleText: string, targeturl: string}){
    const { titleText, targeturl } = props;

    return(
    <div className={style.loginForm}>
        <form className={style.form} action={targeturl} method="post">
            <p className={style.title}>{titleText}</p>
            <label className={style.label}>Email:</label>
            <input className={style.input} type="email" placeholder="email" id="email" name="email" required/>
            <br></br>
            <label className={style.label}>Password:</label>
            <input className={style.input} type="password" placeholder="password" id="password" name="password" required/><br></br>
            <input className={style.login} type="submit" value="Login"/>
        </form>
    </div>
    )
}
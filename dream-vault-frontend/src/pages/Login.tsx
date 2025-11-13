import style from "./Login.module.css";
import InputForm from "../components/InputForm";
import { useLocation } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className={style.login}>
      {message && <div className={style.error}>{message}</div>}
      <InputForm
        targeturl="http://localhost:3000/routes/login"
        titleText="Login to your dreamvault account"
        infoText="Don't have an account?"
        urlText="Sign up here!"
        linkurl="http://localhost:5173/register"
      ></InputForm>
    </div>
  );
}

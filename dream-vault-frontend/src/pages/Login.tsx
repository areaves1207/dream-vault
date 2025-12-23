import style from "./Login.module.css";
import InputForm from "../components/InputForm";
import { useLocation } from "react-router-dom";
import { FRONTEND_URL, API_URL } from "../config.ts"
import StarsBackground from "../components/StarsBackground.tsx";

export default function Login() {
  const location = useLocation();
  const message = location.state?.message;
  const target_url = API_URL + "/routes/login";
  const link_url = FRONTEND_URL + "/register";

  return (
    <div className={style.login}>
      
      {message && <div className={style.error}>{message}</div>}
      <InputForm
        targeturl={target_url}
        titleText="Login to your dreamvault account"
        infoText="Don't have an account?"
        urlText="Sign up here!"
        linkurl={link_url}
      ></InputForm>
      <StarsBackground/>
    </div>
  );
}

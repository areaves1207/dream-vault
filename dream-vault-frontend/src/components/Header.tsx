import styles from "./Header.module.css";
import {API_URL} from "../config.ts"

function Header(){
    const logout = async() => {
        const res = await fetch(API_URL + "/routes/logout",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const data = await res.json();
        console.log(data);
    };

    return(
        <header className={styles.header}>
            <div className={styles.logo}>Logo</div>
            <div className={styles.menuIcon}>Dreamvault</div>
            <a href={API_URL+"login"} onClick={logout} className={styles.user}>Log out</a>
        </header>
    )
}

export default Header;
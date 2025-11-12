import styles from "./Header.module.css";

function Header(){
    const logout = async() => {
        const res = await fetch("http://localhost:3000/routes/logout",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const data = await res.json();
        console.log(data);
    };

    return(
        <header className={styles.header}>
            <div className={styles.menuIcon}>Menu</div>
            <div className={styles.logo}>Logo</div>
            <a href="http://localhost:5173/login" onClick={logout} className={styles.user}>Log out</a>
        </header>
    )
}

export default Header;
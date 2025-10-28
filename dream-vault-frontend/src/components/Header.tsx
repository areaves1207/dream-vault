import styles from "./Header.module.css";

function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.menuIcon}>Menu</div>
            <div className={styles.logo}>Logo</div>
            <div className={styles.user}>User</div>
        </header>
    )
}

export default Header;
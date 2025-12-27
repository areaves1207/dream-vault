import styles from "./AwaitingVerification.module.css"

export default function Verifying() {
  return (
    <h1 className={styles.h1}>
      A verification link has been sent to your email. Please open it to verify your account. It will expire in 10 minutes.
    </h1>
  );
}

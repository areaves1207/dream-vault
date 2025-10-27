import styles from './DreamCard.module.css';
import CardTitle from './DreamCardTitle'

function DreamCard(){
    return(
    <div className={styles.card}>
        <CardTitle></CardTitle>
        Text After Title
    </div>
    )
}

export default DreamCard    
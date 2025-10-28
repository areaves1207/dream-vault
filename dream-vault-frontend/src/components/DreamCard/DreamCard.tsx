import styles from './DreamCard.module.css';
import CardTitle from './DreamCardTitle'
import CardDesc from './DreamCardDescription'

type CardInfo = {
    title: string;
    description: string;
};

function DreamCard({title, description} : CardInfo){
    return(
    <>
    {/* <div className={styles.cardList}> */}
        <div className={styles.card}>
            <button className={styles.menuButton}>&#x22EE;</button>
            <div className={styles.cardInfo}>
                <CardTitle text={title}></CardTitle>
                <hr></hr>
                <CardDesc text={description}></CardDesc>
            </div>
        </div>        
    {/* </div> */}
    </>
    )
}

export default DreamCard    
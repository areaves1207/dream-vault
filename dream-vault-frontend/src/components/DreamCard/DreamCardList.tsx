import styles from "./DreamCardList.module.css"
import Card from "./DreamCard.tsx"

function DreamCardList(){
    return(
        <div className={styles.cardList}>
            <Card title="Testing Title" description='Testing Description'></Card>
            <Card title="Testing Title2" description='Testing Description2'></Card>
            <Card title="Testing Title3" description='Testing Description3'></Card>
            <Card title="Testing Title4" description='Testing Description4'></Card>
            <Card title="Testing Title5" description='Testing Description5'></Card>
            <Card title="Testing Title6" description='Testing Description6'></Card>
        </div>
    )
}

export default DreamCardList
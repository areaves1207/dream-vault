import styles from "./DreamCardList.module.css"
import Card from "./DreamCard.tsx"
import AddDreamCard from "../NewDreamCard.tsx"


function DreamCardList(){
    return(
        <div className={styles.cardList}>
            <AddDreamCard></AddDreamCard>
            <Card title="Testing Title" description='Testing Description' onEdit={()=>{}} onDelete={()=>{}}></Card>
        </div>
    )
}

export default DreamCardList
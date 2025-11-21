import styles from './DreamCard.module.css';
import CardTitle from './DreamCardTitle'
import CardDesc from './DreamCardDescription'
import CardMenu from './CardMenu'
import { useState } from "react"

type CardProps = {
    title: string;
    description: string;
    date: string;
    onEdit: ()=> void;
    onDelete: ()=> void;
};

function DreamCard({title, description, onEdit, onDelete} : CardProps){
    const [isMenuOpen, setMenuOpen] = useState(false);
    
    return(
    <div className={styles.card}>
        <button className={styles.menuButton} onClick={() => setMenuOpen((prev)=>!prev)} >&#x22EE;</button>

        {isMenuOpen &&
            <div className={styles.cardMenu}> 
                <CardMenu
                    onEdit={()=>onEdit()}
                    onDelete={()=>{onDelete();}}
                    onClose={()=>setMenuOpen(false)}
                />
            </div>

        }

        <div className={styles.cardInfo}>
            <CardTitle text={title}></CardTitle>
            <hr></hr>
            <CardDesc text={description}></CardDesc>
        </div>
    </div>        
    )
}

export default DreamCard    
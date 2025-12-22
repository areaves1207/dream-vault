import styles from "./DreamCardList.module.css"
import DreamCard from "./DreamCard.tsx"
import type { Dream } from '../../types.ts';

type CardListProps = {
    cards: Dream[];
    editCard: (card: Dream) => void;
    deleteCard: (id: number)=> void;
};

function DreamCardList({cards, editCard, deleteCard}:CardListProps){
    if(cards.length === 0){
        return(<p>No dreams found</p>);
    }
    return(
        <div className={styles.cardList}>
        { 
            cards.map(card =>
                (
                <DreamCard 
                    key={card.dream_id}
                    title={card.title} 
                    description={card.description} 
                    date={card.date}
                    onEdit={()=>{editCard(card);}} 
                    onDelete={()=>{deleteCard(card.dream_id);}}
                />
                )
            )
            }
        </div>
        
    )
}

export default DreamCardList
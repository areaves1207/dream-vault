import styles from "./DreamCardList.module.css"
import DreamCard from "./DreamCard.tsx"

export type Dream = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

type CardListProps = {
    cards: Dream[];
    addCard: () => void;
    editCard: (card: Dream) => void;
    deleteCard: (id: number)=> void;
};

function DreamCardList({cards, addCard, editCard, deleteCard}:CardListProps){
    return(
        <div className={styles.cardList}>
        { 
            cards.map(card =>
                (
                <DreamCard 
                    key={card.id}
                    title={card.title} 
                    description={card.description} 
                    date={card.date}
                    onEdit={()=>{editCard(card);}} 
                    onDelete={()=>{deleteCard(card.id);}}
                />
                )
            )
            }
        </div>
    )
}

export default DreamCardList
import styles from "./DreamCardList.module.css"
import DreamCard from "./DreamCard.tsx"
import AddDreamCard from "../NewDreamCard.tsx"
import { useState } from 'react'

type DreamCard = {
  id: number;
  title: string;
  description: string;
};


function DreamCardList(){
    const [cards, setCards] = useState<DreamCard[]>([]);

    function addCard(){
        const newCard: DreamCard={
        id: Date.now(),
        title:"testing",
        description: "testing_desc"
        };

        setCards(prev => [...prev, newCard]);
    }

    
    return(
        <div className={styles.cardList}>
            <AddDreamCard onClick={addCard}></AddDreamCard>

            { 
                cards.map(card =>
                    (
                    <DreamCard 
                        title={card.title} 
                        description={card.description} 
                        onEdit={()=>{}} 
                        onDelete={()=>{}}
                    />
                    )
                )
                }
        </div>
    )
}

export default DreamCardList
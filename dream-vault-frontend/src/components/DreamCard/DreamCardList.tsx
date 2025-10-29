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

    function deleteCard(id: number){
        setCards(prev => prev.filter(card => card.id !== id));
    }

    
    return(
        <div className={styles.cardList}>
            <AddDreamCard onClick={addCard}></AddDreamCard>

            { 
                cards.map(card =>
                    (
                    <DreamCard 
                        key={card.id}
                        title={card.title} 
                        description={card.description} 
                        onEdit={()=>{}} 
                        onDelete={()=>{deleteCard(card.id);}}
                    />
                    )
                )
                }
        </div>
    )
}

export default DreamCardList
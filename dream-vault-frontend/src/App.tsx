import { useState } from 'react'
import Cards from './components/DreamCard/DreamCardList.tsx'
import DreamCard from './components/DreamCard/DreamCard.tsx'
import Header from './components/Header.tsx'
import './App.css'
import styles from './App.module.css'
import DreamInput from './components/DreamInput.tsx'
import AddDreamCard from "./components/NewDreamCard.tsx"


type DreamCard = {
  id: number;
  title: string;
  description: string;
};


function App() {
  const [cards, setCards] = useState<DreamCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<DreamCard | null>(null);
  
      function addCard(){
          const newCard: DreamCard={
          id: Date.now(),
          title:"",
          description: ""
          };
          setCards(prev => [...prev, newCard]);
          setCardLockScroll(newCard);
      }
  
      function deleteCard(id: number){
          setCards(prev => prev.filter(card => card.id !== id));
      }

      function setCardLockScroll(card: DreamCard){
        document.body.style.overflow = 'hidden';
        setSelectedCard(card);
      }
      function nullCardUnlockScroll(){
        document.body.style.overflow = 'auto';
        setSelectedCard(null);        
      }

      function editCard(editCard: DreamCard){
          console.log("Updating card:", editCard);
          setCardLockScroll(editCard);
      }

      function cancel(card: DreamCard){
        deleteCard(card.id);
        nullCardUnlockScroll()
      }

      function save(editCard: DreamCard){
          // go through each cards, look for the same cards, if it is then take all its existing info and update title/desc, else just keep prev card
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === editCard.id ? {...card, title: editCard.title, description: editCard.description} : card
            )
          );
          nullCardUnlockScroll()
      }


  return (
    <>
      <Header/>
      {selectedCard && <div className={styles.inputForm}>
        <DreamInput 
          card={selectedCard ?? {id: -1, title:"Error Title", description:"Error Desc."}}
          save={(card: DreamCard) => {save(card);}} 
          cancel={(card: DreamCard) => {cancel(card)} }
        ></DreamInput>
      </div>}


      <div className={styles.column}>
        <AddDreamCard onClick={addCard}></AddDreamCard>

        <div className={styles.cardList}>
          <Cards 
            cards={cards} 
            addCard={() => addCard()} 
            deleteCard={(id) => deleteCard(id)} 
            editCard={(card) => {editCard(card);}}>
          </Cards>
        </div>
      </div>
    </>
  )
}

export default App

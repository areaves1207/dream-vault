import { useState } from 'react'
import Cards, { type Dream } from './components/DreamCard/DreamCardList.tsx'
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
          title:"testing",
          description: "testing_desc"
          };
  
          setCards(prev => [...prev, newCard]);
      }
  
      function deleteCard(id: number){
          setCards(prev => prev.filter(card => card.id !== id));
      }

      function editCard(editCard: DreamCard){
          let c = cards.find(card => card.id === editCard.id)
          if(c){
            c.title = editCard.title;
            c.description = editCard.description;
          }
          setSelectedCard(null);
      }

      function cancel(){
        setSelectedCard(null);
      }
















  return (
    <>
      <Header/>
      <DreamInput 
        card={selectedCard ?? {id: -1, title:"Error Title", description:"Error Desc."}}
        save={(card: DreamCard) => {editCard(card);}} 
        cancel={() => {cancel()} }
      ></DreamInput>
      <div className={styles.cardList}>
        <AddDreamCard onClick={addCard}></AddDreamCard>
        <Cards 
          cards={cards} 
          addCard={() => addCard()} 
          deleteCard={(id) => deleteCard(id)} 
          editCard={(card) => {editCard(card);  console.log(card.id); console.log(card.title);}}>
        </Cards>
      </div>
    </>
  )
}

export default App

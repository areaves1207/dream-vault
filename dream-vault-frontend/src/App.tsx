import { useState, useEffect } from 'react'
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
  date: Date;
};





function App() {
  const url = "http://localhost:3000/dreams/";

  const [cards, setCards] = useState<DreamCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<DreamCard | null>(null);
  useEffect(() => {
    async function fetchDreams() {
      try{
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch cards");

        const data: DreamCard[] = await response.json();
        setCards(data);
      }catch(err){
        console.error(err);
      }
    }

    fetchDreams();
  }, []);
  
      function addCard(){
          const newCard: DreamCard={
          id: Date.now(),
          title:"",
          description: "",
          date: new Date()
          };
          setCardLockScroll(newCard); //todo: does this cause a memory leak? say we added a card but cancelled it, what happens to the memory of that card? 
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

      function cancel(){
        nullCardUnlockScroll()
      }

      async function save(editCard: DreamCard){ //edit or add
        // go through each cards, look for the same cards, if it is then take all its existing info and update title/desc, else just keep prev card
        //if it exists in the list, just update it, otherwise add it
        setCards(prevCards => {
          if(prevCards.some(card => card.id === editCard.id)){ //if alr exists
            return prevCards.map(card =>
              card.id === editCard.id ? {...card, title: editCard.title, description: editCard.description, date: editCard.date} : card
            );
          }else{
            return [...prevCards, editCard];
          }
        });
        nullCardUnlockScroll();

        //Send results to db
        try {
          const response = await fetch("http://localhost:3000/dreams/add_dream", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editCard),
          });

          
          if (!response.ok) {
            throw new Error("Failed to save dream card");
          }

          const data = await response.json();
          console.log("Saved to db:", data);
        }catch(err){
          console.error("Error sending card to db:", err);
        }
      }


  return (
    <>
      <Header/>
      {selectedCard && <div className={styles.inputForm}>
        <DreamInput 
          card={selectedCard ?? {id: -1, title:"Error Title", description:"Error Desc.", date:"1995-01-01"}}
          save={(card: DreamCard) => {save(card);}} 
          cancel={() => {cancel()} }
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

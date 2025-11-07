import { useState, useEffect } from 'react'
import type { Dream } from './types.ts'
import Cards from './components/DreamCard/DreamCardList.tsx'
import Header from './components/Header.tsx'
import './App.css'
import styles from './App.module.css'
import DreamInput from './components/DreamInput.tsx'
import AddDreamCard from "./components/NewDreamCard.tsx"







function App() {
  const url = "http://localhost:3000/dreams/";

  const [cards, setCards] = useState<Dream[]>([]);
  const [selectedCard, setSelectedCard] = useState<Dream | null>(null);
  useEffect(() => {
    async function fetchDreams() {
      try{
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch cards");

        const data: Dream[] = await response.json();
        setCards(data);
      }catch(err){
        console.error(err);
      }
    }

    fetchDreams();
  }, []);
  
    function addCard(){
        const newCard: Dream={
          id: -1,
          title:"",
          description: "",
          date: new Date().toISOString().slice(0, 10)
        };
        console.log("Added card:", newCard);
        setCardLockScroll(newCard); //todo: does this cause a memory leak? say we added a card but cancelled it, what happens to the memory of that card? 
    }

    async function deleteCard(id: number){
        setCards(prev => prev.filter(card => card.id !== id));
        
        try {
          const response = await fetch("http://localhost:3000/dreams/delete_dream", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id}),
          });

          
          if (!response.ok) {
            throw new Error("Failed to save dream card");
          }

        }catch(err){
          console.error("Error sending card to db:", err);
        }
    }

    function setCardLockScroll(card: Dream){
      document.body.style.overflow = 'hidden';
      setSelectedCard(card);
    }
    function nullCardUnlockScroll(){
      document.body.style.overflow = 'auto';
      setSelectedCard(null);        
    }

    function editCard(editCard: Dream){
        console.log("Updating card:", editCard);
        setCardLockScroll(editCard);
    }

    function cancel(){
      nullCardUnlockScroll()
    }

    async function save(editCard: Dream){ //edit or add
      let add = false;
      nullCardUnlockScroll();
      // go through each cards, look for the same cards, if it is then take all its existing info and update title/desc, else just keep prev card
      //if it exists in the list, just update it, otherwise add it

      if(editCard.description == "" && editCard.title == ""){
        return;
      }
      setCards(prevCards => {
        if(prevCards.some(card => card.id === editCard.id)){ //if alr exists
          return prevCards.map(card =>
            card.id === editCard.id ? {...card, title: editCard.title, description: editCard.description, date: editCard.date} : card
          );
        }else{
          add = true;
          return [...prevCards, editCard];
        }
      });
      
      if(add){
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
          let db_id = data.id;

          setCards(prevCards => {
            if(prevCards.some(card => card.id === editCard.id)){ //if alr exists
              return prevCards.map(card =>
                card.id === editCard.id ? {...card, id: db_id} : card
              );
            }else{
              add = true;
              console.error("ERROR UPDATING ID FROM DATABASE");
              return [...prevCards, editCard];
            }
          });
          
        }catch(err){
          console.error("Error sending card to db:", err);
        }
      }else{
        try{
          const response = await fetch("http://localhost:3000/dreams/edit_dream", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editCard),
          });

          if (!response.ok) {
            throw new Error("Failed to save dream card");
          }
          // const data = await response.json();
        }catch(err){
          console.error("Error sending card to db:", err);
        } 
      }
    }


  return (
    <>
      <Header/>
      {selectedCard && <div className={styles.inputForm}>
        <DreamInput 
          card={selectedCard ?? {id: -1, title:"Error Title", description:"Error Desc.", date:"1999-01-01"}}
          save={(card: Dream) => {save(card);}} 
          cancel={() => {cancel()} }
        ></DreamInput>
      </div>}


      <div className={styles.column}>
        <AddDreamCard onClick={addCard}></AddDreamCard>

        <div className={styles.cardList}>
          <Cards 
            cards={cards} 
            deleteCard={(id) => deleteCard(id)} 
            editCard={(card) => {editCard(card);}}>
          </Cards>
        </div>
      </div>
    </>
  )
}

export default App

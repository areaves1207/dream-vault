import { useState, useEffect } from 'react'
import type { Dream } from '../types.ts'
import Cards from '../components/DreamCard/DreamCardList.tsx'
import Header from '../components/Header.tsx'
import './Home.css'
import styles from './Home.module.css'
import DreamInput from '../components/DreamInput.tsx'
import AddDreamCard from "../components/NewDreamCard.tsx"


export default function Home(){
    const url = "http://localhost:3000/dreams/";

    const [cards, setCards] = useState<Dream[]>([]);
    const [selectedCard, setSelectedCard] = useState<Dream | null>(null);
    useEffect(() => {
      async function fetchDreams() {
        try{
          const response = await fetch(url, {
            credentials: 'include'
          });
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
          dream_id: -1,
          title:"",
          description: "",
          date: new Date().toISOString().slice(0, 10)
        };
        setCardLockScroll(newCard); //todo: does this cause a memory leak? say we added a card but cancelled it, what happens to the memory of that card? 
    }

    async function deleteCard(id: number){
        
        try {
          const response = await fetch("http://localhost:3000/dreams/delete_dream", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({dream_id: id}),
            credentials: "include",
          });
          setCards(prev => prev.filter(card => card.dream_id !== id));

          if (!response.ok) {
            console.error("DELETE CARD ERROR RESPONSE: ", response.status, response.statusText);
            throw new Error("Failed to delete dream card.");
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
        setCardLockScroll(editCard);
    }

    function cancel(){
      nullCardUnlockScroll()
    }

    async function save(editCard: Dream){ //edit or add
      nullCardUnlockScroll();
      // go through each cards, look for the same cards, if it is then take all its existing info and update title/desc, else just keep prev card
      //if it exists in the list, just update it, otherwise add it

      if(editCard.description == "" && editCard.title == ""){
        return;
      }

      let db_card;
      const isEdit = cards.some(card => card.dream_id === editCard.dream_id);

      if (isEdit) {
        db_card = await EditDreamCard(editCard);
      } else {
        db_card = await AddNewDreamCard(editCard);
      }

      setCards(prevCards => {
        if(prevCards.some(card => card.dream_id === db_card.dream_id)){ //if alr exists
          return prevCards.map(card =>
            card.dream_id === db_card.dream_id ? {...card, title: db_card.title, description: db_card.description, date: db_card.date} : card
          );
        }else{
          return [...prevCards, db_card];
        }
      });
      
    }

    async function AddNewDreamCard(card: Dream){
      try {
        const response = await fetch("http://localhost:3000/dreams/add_dream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(card),
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error("Failed to save dream card");
        }

        const res = await response.json();
        return res;
      }catch(err){
        console.error("Error adding card to database: ", err);
      }
    }

    async function EditDreamCard(card: Dream){
      try{
        const response = await fetch("http://localhost:3000/dreams/edit_dream", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(card),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to save dream card");
        }

        const res = await response.json();
        return res;
      }catch(err){
        console.error("Error sending card to db:", err);
      } 
    }


  return (
    
    <>
      <Header/>
      {selectedCard && <div className={styles.inputForm}>
        <DreamInput 
          card={selectedCard ?? {dream_id: -1, title:"Error Title", description:"Error Desc.", date:"1999-01-01"}}
          save={(card: Dream) => {save(card);}} 
          cancel={() => {cancel()} }
        ></DreamInput>
      </div>}


      <div className={styles.column}>
        <div className={styles.addCard}>
          <AddDreamCard onClick={addCard}></AddDreamCard>
        </div>

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

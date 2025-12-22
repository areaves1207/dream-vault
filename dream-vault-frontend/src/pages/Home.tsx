import { useState, useEffect } from "react";
import type { Dream } from "../types.ts";
import Cards from "../components/DreamCard/DreamCardList.tsx";
import Header from "../components/Header.tsx";
import "./Home.css";
import styles from "./Home.module.css";
import DreamInput from "../components/DreamInput.tsx";
import AddDreamCard from "../components/NewDreamCard.tsx";
import { API_URL } from "../config.ts";

export default function Home() {
  const url = API_URL + "/dreams/";

  const [allDreams, setAllDreams] = useState<Dream[]>([]);
  const [visibleDreams, setVisibleDreams] = useState<Dream[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCard, setSelectedCard] = useState<Dream | null>(null);
  useEffect(() => {
    async function fetchDreams() {
      try {
        const response = await fetch(url, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch cards");

        const data: Dream[] = await response.json();
        setAllDreams(data);
        setVisibleDreams(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchDreams();
  }, []);

  function addCard() {
    const newCard: Dream = {
      dream_id: -1,
      title: "",
      description: "",
      date: new Date().toLocaleDateString("en-CA"), //auto formats to YYYY-MM-DD
    };
    selectCard(newCard); //todo: does this cause a memory leak? say we added a card but cancelled it, what happens to the memory of that card?
  }

  async function deleteCard(id: number) {
    const delete_url = API_URL + "/dreams/delete_dream";
    try {
      const response = await fetch(delete_url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream_id: id }),
        credentials: "include",
      });
      setVisibleDreams((prev) => prev.filter((card) => card.dream_id !== id));

      if (!response.ok) {
        console.error(
          "DELETE CARD ERROR RESPONSE: ",
          response.status,
          response.statusText
        );
        throw new Error("Failed to delete dream card.");
      }
    } catch (err) {
      console.error("Error sending card to db:", err);
    }
  }

  function selectCard(card: Dream) {
    document.body.style.overflow = "hidden";
    setSelectedCard(card);
  }
  function deselectCard() {
    document.body.style.overflow = "auto";
    setSelectedCard(null);
  }

  async function save(editCard: Dream) {
    //we are either editing or adding a card
    deselectCard();
    if (editCard.description == "" && editCard.title == "") {
      return;
    }

    let db_card;
    const isEdit = visibleDreams.some((card) => card.dream_id === editCard.dream_id);

    if (isEdit) {
      db_card = await EditDreamCard(editCard);
    } else {
      db_card = await AddNewDreamCard(editCard);
    }
    console.error("DATE:", db_card.date);

    setVisibleDreams((prevCards) => {
      if (prevCards.some((card) => card.dream_id === db_card.dream_id)) {
        //if alr exists
        return prevCards.map((card) =>
          card.dream_id === db_card.dream_id
            ? {
                ...card,
                title: db_card.title,
                description: db_card.description,
                date: db_card.date,
              }
            : card
        );
      } else {
        return [...prevCards, db_card];
      }
    });
  }

  async function AddNewDreamCard(card: Dream) {
    let add_dream_url = API_URL + "/dreams/add_dream";
    try {
      const response = await fetch(add_dream_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to save/add dream card");
      }

      const res = await response.json();
      return res;
    } catch (err) {
      console.error("Error adding card to database: ", err);
    }
  }

  async function EditDreamCard(card: Dream) {
    const edit_dream_url = API_URL + "/dreams/edit_dream";
    try {
      const response = await fetch(edit_dream_url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to edit/save dream card");
      }

      const res = await response.json();
      return res;
    } catch (err) {
      console.error("Error sending card to db:", err);
    }
  }

  async function searchDreams() {
    const query=searchQuery;
    if(query.length <= 2){
      console.log("Search query too short");
      return;
    }

    const search_url = API_URL + "/dreams/search?q=" + query;
    try{
      const response = await fetch(search_url, {
        method: "GET",
        credentials: "include"
      });

      const data: Dream[] = await response.json();

      if (!response.ok) {
        console.log("Fail:", response);
        throw new Error("Failed to search for dreams");
      }

      setVisibleDreams(data);

    }catch(e){
      console.error("Error with search: ", e);
    }
    
  }

  function clearSearch(){
    setSearchQuery("");
    setVisibleDreams(allDreams);
  }

  return (
    <>
      <Header />
      {selectedCard && (
        <div className={styles.inputForm}>
          <DreamInput
            card={
              selectedCard ?? {
                dream_id: -1,
                title: "Error Title",
                description: "Error Desc.",
                date: "1999-01-01",
              }
            }
            save={(card: Dream) => {
              save(card);
            }}
            cancel={() => {
              deselectCard();
            }}
          ></DreamInput>
        </div>
      )}

      <div className={styles.column}>
        <div className={styles.addCard}>
          <AddDreamCard onClick={addCard}></AddDreamCard>
        </div>

        <div>
            <input 
              type='search' 
              placeholder="Search dreams" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <button onClick={(e) => {e.preventDefault; searchDreams(); }}>Search</button>
            <button onClick={(e) => {e.preventDefault; clearSearch();}}>Clear</button>
        </div>


        <div className={styles.cardList}>
          <Cards
            cards={visibleDreams}
            deleteCard={(id) => deleteCard(id)}
            editCard={(card) => {
              selectCard(card);
            }}
          ></Cards>
        </div>
      </div>
    </>
  );
}

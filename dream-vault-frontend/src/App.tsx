import { useState } from 'react'
import Cards from './components/DreamCard/DreamCardList.tsx'
import Header from './components/Header.tsx'
import './App.css'
import styles from './App.module.css'

function App() {

  return (
    <>
      <Header/>
      
      <div className={styles.cardList}>
        <Cards></Cards>
      </div>
    </>
  )
}

export default App

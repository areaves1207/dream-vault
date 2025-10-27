import { useState } from 'react'
import Card from './components/DreamCard/DreamCard.tsx'
import Header from './components/Header.tsx'
import './App.css'

function App() {

  return (
    <>
      <Header/>
      <br></br>
      <Card title="Testing Title" description='Testing Description'></Card>
    </>
  )
}

export default App

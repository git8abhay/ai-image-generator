import { useState } from 'react'
import './App.css'
import ImageGenerator from './ImageGenerator';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageGenerator />
    </>
  )
}

export default App

import { useState } from 'react'

import './App.css'

import Top from './components/Top'
import Container from './components/Container'

function App() {
  const [light, setLight] = useState(true)

  const changeMode = () => {
    setLight(!light)
  }

  return (
    <div className='html'>
      <Top light={light} changeMode={changeMode} />
      <Container light={light} />
    </div>
  )
}

export default App

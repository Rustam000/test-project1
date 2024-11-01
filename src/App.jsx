import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AuctionRoom from './components/AuctionRoom/CompanyCard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuctionRoom/>
    </>
  )
}

export default App

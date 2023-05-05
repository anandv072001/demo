import { useState } from 'react'
import CampaignCreation from './components/CampaignCreation'
import "./styles/CampaignCreation.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CampaignCreation />
    </>
  )
}

export default App

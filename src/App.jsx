import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//components
import ProductManager from './components/ProductManager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="h-screen bg-gray-100">
        <ProductManager />
      </div>
    </>
  )
}

export default App

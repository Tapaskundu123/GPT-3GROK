import GPT3 from './components/GPT3/GPT3.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GPT3 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


import './globle.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  
  return (
    <>
   
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/Register' element={ <Register /> } />
        <Route path='/Dashboard' element={ <Dashboard /> } />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App

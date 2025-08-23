
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
        <Route path='/register' element={ <Register /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App

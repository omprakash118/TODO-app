
import './globle.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  
  return (
    <>
   
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/Register' element={ <Register /> } />
        <Route path='/Dashboard' element={ <Home /> } />
        <Route path='/' element={<Navigate to = "/login" />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App;

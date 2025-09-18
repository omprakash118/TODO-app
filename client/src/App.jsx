
import './globle.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import Register from './pages/Register'
import MainComponent from './component/MainComponent'

function App() {
  
  return (
    <>
   
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/Register' element={ <Register /> } />
        <Route path='/*' element={ <MainComponent /> } />
        {/* <Route path='/' element={<Navigate to = "/login" />} /> */}
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App;

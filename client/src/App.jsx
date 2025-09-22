
import './globle.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import Register from './pages/Register'
import MainComponent from './component/MainComponent'
import { GlobalLoaderProvider } from './component/ui/GlobalLoaderProvider'
import { ToastProvider } from './component/ui/ToastProvider'
import GlobalLoaderErrorBoundary from './component/ui/GlobalLoaderErrorBoundary'

function App() {
  
  return (
    <>
   
    <BrowserRouter>
      <GlobalLoaderErrorBoundary>
        <GlobalLoaderProvider>
          <ToastProvider>
            <Routes>
              <Route path='/' element={ <LoginPage /> } />
              <Route path='/login' element={ <LoginPage /> } />
              <Route path='/Register' element={ <Register /> } />
              <Route path='/dashboard' element={ <MainComponent /> } />
              <Route path='/*' element={<MainComponent />} />
            </Routes>
          </ToastProvider>
        </GlobalLoaderProvider>
      </GlobalLoaderErrorBoundary>
    </BrowserRouter>

    </>
  )
}

export default App;

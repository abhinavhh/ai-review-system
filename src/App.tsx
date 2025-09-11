
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<App />}/> */}
        <Route path='/' element={<LoginPage />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/register' element={<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, data, Route, Routes } from 'react-router-dom'
import ReviewPage from './pages/ReviewPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Home from './pages/Home'
import ReviewForm from './components/ReviewForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<App />}/> */}
        <Route path='/' element={<LoginPage />}/>
        <Route path='/reviews' element={<ReviewPage />}/>
        <Route path='/review' element={<ReviewForm onReviewAdded={data}/>}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/register' element={<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, data, Route, Routes } from 'react-router-dom'
import ReviewPage from './pages/ReviewPage'
import LiveReviewPage from './pages/LiveReviewPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ReviewForm from './components/ReviewForm'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* <Route path='/' element={<App />}/> */}
        <Route path='/' element={<Home />}/>
        <Route path='/reviews' element={<ReviewPage />}/>
        <Route path='/review' element={<ReviewForm onReviewAdded={data}/>}/>
        <Route path='/live-review' element={<LiveReviewPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
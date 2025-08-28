
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReviewPage from './pages/ReviewPage'
import LiveReviewPage from './pages/LiveReviewPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<App />}/> */}
        <Route path='/' element={<ReviewPage />}/>
        <Route path='/live-review' element={<LiveReviewPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
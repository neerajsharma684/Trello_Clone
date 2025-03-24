import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, SignUp, Home } from './pages';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

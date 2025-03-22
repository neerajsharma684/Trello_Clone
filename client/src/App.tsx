import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, SignUp } from './pages';
import Loader from './components/Loader';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Loader />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

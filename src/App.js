import {  BrowserRouter, Route, Routes } from 'react-router-dom';

//styles
import './App.css'

//pages and components
import HomePage from './pages/homepage/Homepage'
import Create from './pages/create/Create'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Projects from './pages/projects/Projects'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route  exact path="/" element={<HomePage />} />
          </Routes>
          <Routes>
            <Route path="/create" element={<Create />} />
          </Routes>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/projects/:id" element={<Projects />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App

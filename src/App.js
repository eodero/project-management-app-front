import {  BrowserRouter, Route, Routes } from 'react-router-dom';

//styles
import './App.css'

//pages and components
import HomePage from './pages/homepage/Homepage'
import Create from './pages/create/Create'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Projects from './pages/projects/Projects'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
       <Sidebar />
        <div className='container'>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
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

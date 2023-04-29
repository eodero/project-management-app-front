import {  Route, Routes, createPath } from 'react-router-dom';

//styles
import './App.css'

//pages and components
import  { HomePage }  from './pages/homepage/HomePage'
import { AddProject } from './pages/addProject/AddProject'
import { Register } from './pages/register/Register'
import { Login } from './pages/login/Login'
import { ProjectDetails } from './pages/projects/ProjectDetails'
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { homePath } from './routes/HomeRoute';
import { addProjectPath }  from './routes/AddProjectRoute'
import { registerPath } from './routes/RegisterRoute';
import { loginPath } from './routes/LoginRoute';
import {  projectPath } from './routes/ProjectsRoute';

function App() {
  return (
    <div className='App'>
       <Sidebar />
        <div className='container'>
          <Navbar />
          <Routes>
            <Route path={homePath} element={<HomePage />} />
            <Route path={addProjectPath} element={<AddProject />} />
            <Route path={registerPath} element={<Register />} />
            <Route path={loginPath} element={<Login />} />
            <Route path={projectPath} element={<ProjectDetails />} />
          </Routes>
        </div>
    </div>
  );
}

export default App

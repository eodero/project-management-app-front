import {  Navigate, Route, Routes } from 'react-router-dom';

//styles
import './App.css'
//pages and components
import  { HomePage }  from './pages/homepage/HomePage'
// import { AddProject } from './components/AddProject'
import { Register } from './pages/register/Register'
import { Login } from './pages/login/Login'
import { Navbar } from './components/Navbar';
import { homePath } from './routes/HomeRoute';
// import { addProjectPath }  from './routes/AddProjectRoute'
import { registerPath } from './routes/RegisterRoute';
import { loginPath } from './routes/LoginRoute';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
  const { isAuthenticated } = useAuthContext();
  return (
    <div className='App'>
      <Navbar />
        <Routes>
          <Route
            path={homePath}
            element={isAuthenticated ? <HomePage /> : <Navigate to={loginPath} />}
          />
            {/* <Route path={addProjectPath} 
            element={isAuthenticated ? <AddProject /> :<Navigate to={loginPath} />} 
            /> */}
            <Route path={registerPath} 
            element={!isAuthenticated ? <Register /> : <Navigate to={homePath} />} 
            />
            <Route path={loginPath} 
            element={!isAuthenticated ? <Login /> : <Navigate to={homePath}/>} 
            />
          </Routes>
      </div>
  );
}

export default App

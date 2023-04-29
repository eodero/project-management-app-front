import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { registerPath } from '../routes/RegisterRoute';
import { homePath } from '../routes/HomeRoute';
import { loginPath } from '../routes/LoginRoute';
import { addProjectsPath } from '../routes/ProjectsRoute';

export const NavigationLinks = () => {
    return (
        <div>
            <nav>
                <Link to={homePath} >Home</Link>
                <Link to={registerPath}>Register</Link>
                <Link to={loginPath}>Login</Link>
                <Link to={addProjectsPath}>Add Project</Link>
            </nav>
        </div>
    )
}
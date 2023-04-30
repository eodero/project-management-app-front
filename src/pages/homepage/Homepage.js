import React from 'react';
//styles
import './HomePage.css'
import { useFetchProjects } from '../../hooks/useFetchProjects';
import { AddProject } from '../../components/AddProject';
import { useAuthContext } from '../../hooks/useAuthContext';
import { ProjectsTable } from '../../components/ProjectsTable';


export const HomePage = () => {
  const { user } = useAuthContext();
  console.log('User in HomePage:', user);
  const { projects, error, isPending } = useFetchProjects();
  return (
    <div className='container'>
        {error && <p>{error}</p> }
        {isPending && <p>Loading projects, please wait...</p>}
        {projects && <ProjectsTable projects={projects}/>}
      <div className='sidebar'>
        {user && <AddProject id={user.id} />}
      </div>
    </div>
  )
}


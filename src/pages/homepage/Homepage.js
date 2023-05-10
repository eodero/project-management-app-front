import React, { useState } from 'react';
import { useFetchProjects } from '../../hooks/useFetchProjects';
// import { useAuthContext } from '../../hooks/useAuthContext';
// import { AddProject } from '../../components/AddProject';
import { ProjectsTable } from '../../components/ProjectsTable';
//styles
import './Homepage.css'


export const Homepage = () => {
  // const { user } = useAuthContext();
  // console.log('User in HomePage:', user);
  const { projects, error, isPending } = useFetchProjects();
  const [sortBy, setSortBy] = useState("task");
  
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  }
  
  return (
    <div className='container'>
      <div className="contents">
        {error && <p>{error}</p> }
        {isPending && <p>Loading projects, please wait...</p>}
        <select onChange={handleSortBy}>
          <option value="task">Task</option>
          <option value="dueDate">Due date</option>
          <option value="assignedTo">Assigned to</option>
          <option value="status">Status</option>
        </select>
        {projects && <ProjectsTable projects={projects} sortBy={sortBy}/>}
      </div>
      {/* <div className='sidebar'>
        {user && <AddProject id={user.id} />}
      </div> */}
    </div>  
  )
}


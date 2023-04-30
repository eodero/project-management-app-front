import React, { useState } from 'react'
import { useAddProject } from '../hooks/useAddProjects';

//styles
import './AddProject.css'


export const AddProject = () => {
  const { addProject } = useAddProject();
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('pending');
  
  const handleSubmit = async(e) => {
      e.preventDefault();
      
      try {
        await addProject({
          task,
          dueDate,
          description,
          assignedTo,
          status
        })
        setTask('');
        setDueDate('');
        setDescription('');
        setAssignedTo('');
        setStatus('pending');
      } catch (error) {
        console.error("Error adding project:", error.message);
      }
  }
  
  return (
    <>
      <h3>Add Project</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Task:</span>
          <input 
            type="text"
            required
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          </label>
          
          <label>
          <span>Due Date:</span>
          <input 
            type="date"
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
          </label>
          
          <label>
            <span>Description:</span>
          <textarea
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            ></textarea> 
          </label>
          
          <label>
          <span>Assigned to::</span>
          <input 
            type="text"
            required
            onChange={(e) => setAssignedTo(e.target.value)}
            value={assignedTo}
          />
          </label>
          
        <label>
          <span>status:</span>
           <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
           </select>
        </label>
        <button>Add project</button>
      </form>
    </>
  )
}

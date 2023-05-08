import React, { useState } from 'react'
import { useAddProject } from '../hooks/useAddProjects';

//styles
import './AddProject.css'
import toast, { Toaster } from 'react-hot-toast';


export const AddProject = ({ onSuccessSubmit, setShowAddProjectForm, onAdd }) => {
  const { addProject, error, isPending } = useAddProject();
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('open');
  
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
        onAdd();//after project is added refresh with new data
        setTask('');
        setDueDate('');
        setDescription('');
        setAssignedTo('');
        setStatus('open');
        
        onSuccessSubmit();
        toast.success("Project created successfully")
      } catch (error) {
        console.error("Error adding project:", error.message);
      }
  }
  
  return (
    <>
    <Toaster />
      <h3>Add Project</h3>
      <form onSubmit={handleSubmit} className="add-project-form">
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
          <span>Assigned to:</span>
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
            <option value="open">Open</option>
            <option value="closed">Closed</option>
           </select>
        </label>
        <button>Add project</button>
        <button type="button" onClick={() => setShowAddProjectForm(false)} >Cancel</button>
      </form>
      {error && <p>{error}</p>}
    </>
  )
}


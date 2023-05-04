import { useState } from "react";
import api from "../utils/api";
import { useAuthContext } from "../hooks/useAuthContext";

export const UpDateProject = ({ project, onUpdate, onCancel }) => {
    const [task, setTask] = useState(project.task);
    const [dueDate, setDueDate] = useState(project.dueDate);
    const [description, setDescription] = useState(project.description);
    const [assignedTo, SetAssignedTo] = useState(project.assignedTo);
    const [status, setStatus] = useState(project.status);
    const { user } = useAuthContext();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await api.patch(`/projects/${project._id}`, {
                task,
                dueDate,
                description,
                assignedTo,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                }
            });
            
            onUpdate(res.data);
            
        } catch (error) {
            console.error("Error updating project", error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Task:
                <input 
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
            </label>
            <label>
                Due Date:
                <input 
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
            </label>
            <label>
                Description:
                <textarea 
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </label>
            <label>
                Assigned to:
                <input 
                  type="text"
                  value={assignedTo}
                  onChange={(e) => SetAssignedTo(e.target.value)}
                />
            </label>
            <label>
                Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select> 
            </label>
            
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    )
};


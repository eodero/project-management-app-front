import { useMemo, useState } from 'react';
import api from '../utils/api';
import { UpDateProject } from './UpDateProjects';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { AddProject } from './AddProject';


//styles
import './ProjectsTable.css'
import './AddProjectModal.css'
import toast, { Toaster } from 'react-hot-toast';


//modal
Modal.setAppElement("#root");

export const ProjectsTable = ({ projects, sortBy }) => {
    const [upDatedProject, setUpdatedProject] = useState(null);
    const [edit, setEdit] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAddProjectForm, setShowAddProjectForm] = useState(false);
    const [reFetch, setRefetch] = useState(false);
    const { user } = useAuthContext();
    
    const sortedProjects = useMemo(() => {
        return [...projects].sort((a, b) => {
            if(a[sortBy] < b[sortBy]) return -1;
            if(a[sortBy] > b[sortBy]) return 1;
            return 0;
        });
    }, [projects, sortBy]);
    
    const handleEdit = (project) => {
        if(!selectedProject){
            toast.error("Please select an item to edit") 
        } else {
        setEdit(true);
        setUpdatedProject(project);
        }
    }
    const handleDelete = async(projectId) => {
        if(!selectedProject) {
            toast.error("Please select an item to delete");
        } else {
            try {
                await api.delete(`/projects/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                });
                toast.success("Project deleted successfully");
            } catch (error) {
                toast.error("Error deleting project", error);
            }
        }
    };
    
    const handleUpdate = (upDatedProject) => {
        setEdit(false);
        setUpdatedProject(upDatedProject);
    };
    
    const handleAddedProject = () => {
        setRefetch(!reFetch);
      };
    
  return (
    <div className="table-wrap">
        <Toaster />
        <div className="table-title">
            <h3>Listed Projects</h3>
        </div>
            <div className="button-container">
                <button onClick={() => handleEdit(selectedProject)} >Edit</button>
                <button onClick={() => handleDelete(selectedProject)}><FontAwesomeIcon icon={faTrashCan} /></button>
                <button className="add-project" onClick={() => setShowAddProjectForm(!showAddProjectForm)}><FontAwesomeIcon icon={faPlusSquare}/></button>
            </div>
            
        <div className="table-display">
            <p>Showing 1 to {sortedProjects.length} of {sortedProjects.length} items</p>
        </div>
        
        {edit && (
            <UpDateProject
            project={upDatedProject}
            onUpdate={handleUpdate}
            onCancel={() => setEdit(false)}
             />
        )}
        
        <Modal 
          isOpen={showAddProjectForm}
          onClose={() => setShowAddProjectForm(false)}
          contentLabel="Add Project Modal"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <AddProject 
          id={user.id} 
          onSubmit={() => setShowAddProjectForm(false)} 
          setShowAddProjectForm={setShowAddProjectForm}
          onSuccessSubmit={() => setShowAddProjectForm(false)}
          onAdd={handleAddedProject}
          />
        </Modal>
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th>No.</th>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Description</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {sortedProjects.map((project, index) => (
                    <tr key={project._id}>
                        <td>
                            <input
                              type="checkbox"
                              name="project-selected"
                              value={project._id}
                              onChange={() => setSelectedProject(project._id)}
                            />
                        </td>
                        <td>{index + 1}</td>
                        <td>{project.task}</td>
                        <td>{project.dueDate}</td>
                        <td>{project.description}</td>
                        <td>{project.assignedTo}</td>
                        <td>{project.status}</td>
                        <td>
                            {/* <button onClick={() => handleEdit(project._id)}>Edit</button>
                            <button onClick={() => handleDelete(project._id)}>Delete</button> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    </div>
  )
};



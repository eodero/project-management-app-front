//styles
import './ProjectsTable.css'

export const ProjectsTable = ({projects}) => {
    console.log("Projects in table:", projects);
    
  return (
    <div className="table">
        <table>
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Description</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <tr key={project._id}>
                        <td>{project.task}</td>
                        <td>{project.dueDate}</td>
                        <td>{project.description}</td>
                        <td>{project.assignedTo}</td>
                        <td>{project.status}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
};



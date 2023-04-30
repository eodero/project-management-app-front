
export const ProjectList = ({ projects }) => {
  return (
    <ul className="projects">
        {projects.map((project) => (
            <li key={project.id}>
                <p className="name">{project.task}</p>
                <p className="date">{project.dueDate}</p>
                <p className="description">{project.description}</p>
                <p className="assigned">{project.assignedTo}</p>
                <p className="status">{project.status}</p>
            </li>
        ))}
    </ul>
  )
}


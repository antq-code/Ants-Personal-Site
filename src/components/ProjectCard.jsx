export default function ProjectCard({ project }) {
  return (
    <div className="techCard">
      <div className="techCardHeader">
        <h3 className="techCardTitle">{project.title}</h3>
        <span className="techCardDate">{project.dateRange}</span>
      </div>
      <p className="techCardRole">{project.role}</p>
      <div className="techCardImage" aria-hidden="true">
        <span>Add image</span>
      </div>
      <ul className="techStack">
        {project.techStack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <p className="techCardDescription">{project.description}</p>
    </div>
  );
}

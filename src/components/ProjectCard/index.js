import './index.css'

function ProjectCard(props) {
  const {eachProject} = props
  const {id, name, imageUrl} = eachProject
  return (
    <li key={id} className="project-list-item">
      <img src={imageUrl} alt={name} className="project-img" />
      <h1>{name}</h1>
    </li>
  )
}

export default ProjectCard

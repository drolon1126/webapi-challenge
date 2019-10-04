import React from 'react';

const ProjectCard = props => {
  const { name, description } = props.project;
  return (
    <div className="project-card">
      <h2>{name}</h2>
      <h3>{description}</h3>
    </div>
  );
};

export default ProjectCard;

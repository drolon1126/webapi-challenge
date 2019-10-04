import React, {useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ProjectCard from './ProjectCard';

const ProjectList = () =>{
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    axios
      .get('http://localhost:5000/api/projects')
      .then(res=>setProjects(res.data))
      .catch(err=>console.log(err.response));
  },[]);

  return(
    <div>
      {projects.map(project=>(
        <ProjectDetails key={project.id} project={project}/>
      ))}
    </div>
  );
}

function ProjectDetails({project}){
  return(
    <Link to={`/projects/${project.id}`}>
      <ProjectCard project={project}/>
    </Link>
  );
}

export default ProjectList;
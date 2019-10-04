import React, {useState,useEffect} from 'react';
import axios from "axios";

const Project = props => {
  const [project,setProject] = useState({});
  const [actions,setActions] = useState([]);

  useEffect(()=>{
    axios
      .get(`http://localhost:5000/api/projects/${props.match.params.id}`)
      .then(res=>setProject(res.data))
      .catch(err=>console.log(err.response));
    axios
      .get(`http://localhost:5000/api/projects/${props.match.params.id}/actions`)
      .then(res=>setActions(res.data))
      .catch(err=>console.log(err.response));
  },[]);

  return (
    <div className="project-card">
      <h2>{project.name}</h2>
      <h4>{project.description}</h4>
      <h3>Actions: </h3>

      {actions.map(action => (
        <div key={action.id} className="action">
          <h4>{action.description}</h4>
          <p>{action.notes}</p>
        </div>
      ))}

    </div>
  );
};

export default Project;

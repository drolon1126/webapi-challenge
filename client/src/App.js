import React from "react";
import { Route } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import Project from "./components/Project";
import './App.css';

const App = () => {

  return (
    <div className="App">
      <Route exact path='/' component={ProjectList}/>
      <Route path='/projects/:id' component={Project}/>
    </div>
  );
}

export default App;

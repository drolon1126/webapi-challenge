const express = require('express');

const db = require('../data/helpers/projectModel.js');

const router = express.Router();

router.post('/', validateProject, (req, res) => {
  db.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: 'There was an error while saving the project to the database.' })
    });

});

router.get('/', (req, res) => {
  db.get()
    .then(projects=>{
      res.status(200).json(projects);
    })
    .catch(() => {
      res.status(500).json({ error: "The projects information could not be retrieved." });
    });

});

router.get('/:id', validateId, (req, res) => {
  res.status(200).json(req.project);
});

router.get('/:id/actions', validateId, (req, res) => {
  db.getProjectActions(req.params.id)
    .then(actions=>{
      res.status(200).json(actions);
    })
    .catch(()=>{
      res.status(500).json({ error: "The project actions information could not be retrieved." });
    });
});

router.delete('/:id', validateId, (req, res) => {
  db.remove(req.params.id)
    .then(()=>{
      res.status(200).json(req.project);
    })
    .catch(()=>{
      res.status(500).json({ error: "The project could not be removed." });
    });
});

router.put('/:id', validateId, validateProject, (req, res) => {
  db.update(req.params.id,req.body)
    .then(project=>{     
      res.status(200).json(project);
    })
    .catch(()=>{
      res.status(500).json({ error: "The project information could not be modified." });
    });
});

//custom middleware

function validateId(req, res, next) {
  db.get(req.params.id)
    .then(project=>{
      if(!project)
        res.status(404).json({errorMessage: 'Id does not exist'})
      req.project = project;
      next();
    })
    .catch(()=>{
      res.status(400).json({ errorMessage: "invalid project id" });
    });
};

function validateProject(req, res, next) {
  if (!req.body) {
    res.status(400).json({ errorMessage: "Missing project data" });
  }
  if (!req.body.name || !req.body.description){
    res.status(400).json({ errorMessage: "Please provide a name and description" });
  }
  next();    
};

module.exports = router;
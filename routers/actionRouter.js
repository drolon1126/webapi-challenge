const express = require('express');

const db = require('../data/helpers/actionModel.js');

const router = express.Router();

router.post('/', validateAction, (req, res) => {
  db.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(() => {
      res.status(500).json({ errorMessage: 'There was an error while saving the action to the database.' })
    });

});

router.get('/', (req, res) => {
  db.get()
    .then(actions=>{
      res.status(200).json(actions);
    })
    .catch(() => {
      res.status(500).json({ error: "The actions information could not be retrieved." });
    });

});

router.get('/:id', validateId, (req, res) => {
  res.status(200).json(req.action);
});

router.delete('/:id', validateId, (req, res) => {
  db.remove(req.params.id)
    .then(()=>{
      res.status(200).json(req.action);
    })
    .catch(()=>{
      res.status(500).json({ error: "The action could not be removed." });
    });
});

router.put('/:id', validateId, validateAction, (req, res) => {
  db.update(req.params.id,req.body)
    .then(action=>{     
      res.status(200).json(action);
    })
    .catch(()=>{
      res.status(500).json({ error: "The action information could not be modified." });
    });
});

//custom middleware

function validateId(req, res, next) {
  db.get(req.params.id)
    .then(action=>{
      if(!action)
        res.status(404).json({errorMessage: 'Id does not exist'})
      req.action = action;
      next();
    })
    .catch(()=>{
      res.status(400).json({ errorMessage: "invalid action id" });
    });
};

function validateAction(req, res, next) {
  if (!req.body) {
    res.status(400).json({ errorMessage: "Missing action data" });
  }
  if (!req.body.notes || !req.body.description){
    res.status(400).json({ errorMessage: "Please provide a notes and description" });
  }
  if(!req.body.project_id)
    res.status(400).json({ errorMessage: "Please provide a project_id" });
  
  next(); 
};

module.exports = router;
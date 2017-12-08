'use strict'
const apiRouter = require('express').Router()
const db = require('../db')
const Campuses = require('../db/models/campuses')
const Students = require('../db/models/students')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
apiRouter.get('/hello', (req, res) => res.send({hello: 'world'}))


apiRouter.get('/campuses', (req, res, next) => {
  Campuses.findAll({
    include: {
      all: true
    }
  })
  .then(campuses => res.send(campuses))
  .catch(next)
})

apiRouter.get('/campuses/:id', (req, res, next) => {
  Campuses.findById(req.params.id)
  .then(campus => res.json(campus))
  .catch(next)
})

apiRouter.post('/campuses/add', (req, res, next) => {
  Campuses.create({name: req.body.name, description: req.body.description, students: req.body.students})
  .then(createdCampus => res.send(createdCampus.name, ' is created.'))
  .catch(next)
})

apiRouter.put('/campuses/:id', (req, res, next) => {
  Campuses.update(req.body, {
    where: {id: req.params.id}
  })
  .then(updateCampus => res.send(updateCampus.name, ' is updated'))
  .catch(next)
})


// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

module.exports = apiRouter;

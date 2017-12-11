'use strict'
const apiRouter = require('express').Router()
const db = require('../db')
const Campuses = require('../db/models/campuses')
const Students = require('../db/models/students')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
apiRouter.get('/hello', (req, res) => res.send({hello: 'world'}))

//get campuse
apiRouter.get('/campuses', (req, res, next) => {
  Campuses.findAll({include: { all: true }})
  .then(campuses => res.json(campuses))
  .catch(next)
})

//get a single campus
apiRouter.get('/campuses/:id', (req, res, next) => {
  Campuses.findById(req.params.id, {include:{all:true}})
  .then(campus => res.send(campus))
  .catch(next)
})

//create a campus
apiRouter.post('/campuses/add', (req, res, next) => {
  Campuses.create(req.body)
  .then(createdCampus => res.json(createdCampus))
  .catch(next)
})

//update campus
apiRouter.put('/campuses/:id/', (req, res, next) => {
  Campuses.update(req.body, {
    where: {id: req.params.id}
  })
  .then(updateCampus => res.send(updateCampus.name, ' is updated'))
  .catch(next)
})

//delete campus
apiRouter.delete('/campuses/:id', (req, res, next) => {
  const campusId = req.params.id
  Campuses.destroy({where: {id: campusId}})
  .then(res.status(204).send())
  .catch(next)
})

//get students
apiRouter.get('/students', (req, res, next) => {
  Students.findAll()
  .then(students => res.json(students))
  .catch(next)
})

//create student
apiRouter.post('/students/add', (req, res, next) => {
  Students.create(req.body)
  .then(students => res.json(students))
  .catch(next)
})

//delete student
apiRouter.delete('students/:id', (req, res, next) => {
  Students.destroy({ where: { id: req.params.id }})
  .then(result => res.send({message: 'student destoryed'}))
})

//delete student if campus is destroyed
apiRouter.delete('students/campus/:campusId', (req, res, next) => {
  Students.destroy({ where: { campusId: req.params.campusId}})
})

//update student
apiRouter.put('/student/:id', (req, res, next) => {
  Students.update(req.body, {
    where: {id: req.params.id}
  })
  .then(updateStudent => res.send(updateStudent.fullName, ' is updated.'))
  .catch(next)
})
// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

module.exports = apiRouter;

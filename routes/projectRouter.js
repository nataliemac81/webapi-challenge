const express = require('express')

const router = express.Router()

const projectDb = require('../data/helpers/projectModel')
const actionDb = require('../data/helpers/actionModel')

router.get('/', (req, res) => {
	projectDb.get()
	.then(projects => {
		res.status(200).json(projects)
	})
	.catch(err => {
		res.status(500).json({
			err: err,
			message: "Could not retrieve projects"
		})
	})
})

router.get('/:id', (req, res) => {
	const { id } = req.params
	
	projectDb.get(id)
	.then(project => {
		if(project) {
			res.status(200).json(project)
		} else {
			res.status(404).json({
				message: "The project with the specified ID does not exist."
			})
		}
	})
	.catch(err => {
		res.status(500).json({
			err: err,
			message: "The project information could not be retrieved."
		})
	})
})

router.get('/:id/actions', (req, res) => {
	const { id } = req.params
	const projectId = id
	
	projectDb.getProjectActions(projectId)
	.then(actions => {
		if(projectId) {
			res.status(200).json(actions)
		} else {
			res.status(404).json({
				message: "An action with that ID does not exist."
			})
		}
	})
	.catch(err => {
		res.status(500).json({
			err: err,
			message: "The actions information could not be retrieved."
		})
	})
})

router.post('/', (req, res) => {
	const project = req.body
	const name = project.name
	const description = project.description
	if (!name || !description) {
		res.status(400).json({
			message: "Please provide name and description for the project."
		})
	}
	projectDb.insert(project)
		.then(project => {
			res.status(201).json(project)
		})
		.catch(err => {
			res.status(500).json({
				err: err,
				message: 'There was an error while saving the project to the database'
			})
		})
})

router.put('/:id', (req, res) => {
	const { id } = req.params
	const changes = req.body
	
	projectDb.get(id).then(project => {
		if(project) {
			projectDb.update(id, changes).then(updated => {
				if (!changes.name || !changes.description) {
					res.status(400).json({
						message: "Please provide a name and description for the post."
					})
				} else {
					res.status(200).json(updated)
				}
			})
		}
	})
})

router.delete('/:id', (req, res) => {
	const { id } = req.params

	projectDb.remove(id)
	.then(project => {
		if (project) {
			res.status(200).json({ message: "Project deleted."})
		} else {
			res.status(404).json({ message: "A project with that ID does not exist."})
		}	
	})
	.catch(err => {
		res.status(500).json({
			err: err,
			message: "The project could not be removed"
		})
	})
})


module.exports = router
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

router.post('/', (req, res) => {

})

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {

})


module.exports = router
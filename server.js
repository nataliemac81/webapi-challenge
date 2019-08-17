// import Express
const express = require('express')

// Routers
const projectRouter = require('./routes/projectRouter')
const actionRouter = require('./routes/actionRouter')


const server = express()

server.use(express.json())
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res) => {
	res.send(`<h1>Web API sprint challenge</h1>`)
})



module.exports = server
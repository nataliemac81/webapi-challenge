// import Express
const express = require('express')

// Routers
const projectRouter = require('./routes/projectRouter')



const server = express()

server.use(express.json())
server.use('/api/projects', projectRouter)


server.get('/', (req, res) => {
	res.send(`<h1>Web API sprint challenge</h1>`)
})



module.exports = server
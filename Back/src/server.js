require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')

const cors = require('cors')
const bodyParser = require('body-parser')

const dataBase = require('./database/dataBase')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* --Listar comentarios--
axios.get("http://localhost:3003/comentar").then(function(resposta){
	console.log(resposta.data);
})*/

app.get('/filmes', async(req, res) =>{
	const filmes = await dataBase.showMovie()
	res.send(filmes)
})

app.get('/series', async(req, res) =>{
	const series = await dataBase.showSerie()
	res.send(series)
})


app.get('/comentar', async (req, res) => {
	res.send( await dataBase.mostrarComentarios())
})

app.post('/comentar', async (req, res) => {
	const comentario = await dataBase.salvarComentario({
		nome: req.body.nome,
		comentario: req.body.comentario
	})
	res.send(comentario)
})

app.delete('/comentar/:id', async (req, res) => {
    res.send(await dataBase.deletarComentario(req.params.id))
})

app.all("/*", (req, res, next) => {
	req.header("Access-Control-Allow-Origin", "*");

	res.header("Access-Control-Allow-Methods", "*");

	res.header(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Methods");
})


app.listen(3003)

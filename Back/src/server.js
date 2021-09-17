require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const dataBase = require('./database/dataBase')

const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*axios.get("https://api.themoviedb.org/3/tv/67136?api_key=172c6271ccf9b86b8f65f98250a5e3fc&language=pt-BR").then(function(resposta){
	console.log(resposta.data);
})*/

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

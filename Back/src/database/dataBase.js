const { databaseConnection } = require('./connection')
const axios = require('axios')

const API_KEY =  process.env.API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?with_genres=36&language=pt-BR&' + API_KEY

const API_URLS = BASE_URL + '/discover/tv?with_network=213&language=pt-BR&' + API_KEY

const comentario = {}

async function showMovie(data){
	try {
		const { data } = await axios (`${API_URL}`)
		return data.results
	} catch (error){
		console.log(error)
	}

}

async function showSerie(data){
	try {
		const { data } = await axios (`${API_URLS}`)
		return data.results
	} catch (error){
		console.log(error)
	}

}

async function salvarComentario(comentario) {

	  const queryInsertComent = `INSERT INTO comentarios(nome, comentario) VALUES ('${comentario.nome}', '${comentario.comentario}')`

    const result = await databaseConnection.raw(queryInsertComent)

	if (result) {
		return {
			nome: comentario.nome,
			comentario: comentario.comentario,
			id: result[0]
		}
	} else {
			console.error("Deu erro!")
			return {
				error: "Erro na inserção"
			}
		}
	}


async function mostrarComentarios(){
	const result = await databaseConnection('comentarios')

	return result
}

async function deletarComentario(id){

    const result = await databaseConnection('comentarios').where({ id }).del()

    return result[0]
}


module.exports = { salvarComentario, mostrarComentarios, deletarComentario, showMovie, showSerie }


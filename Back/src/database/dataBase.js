const { databaseConnection } = require('./connection')


const sequence = {
    _id: 1,
    get id() {return this._id++}
}

const comentario = {}


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


module.exports = { salvarComentario, mostrarComentarios, deletarComentario }


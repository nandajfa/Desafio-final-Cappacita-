const IMG_URL = 'https://image.tmdb.org/t/p/w500'

const main = document.getElementById("main")

async function getMovie() {
		   try {
			   const response = await fetch('http://localhost:3003/filmes')
			   const data = await response.json()

			   showMovies(data)
		   } catch (error) {
			   console.log(error)
		   }

	   }

getMovie()

function showMovies(movies){
	main.innerHTML = '';

	movies.forEach(movie => {

		const {title, poster_path, vote_average, overview} = movie;
		const movieE1 = document.createElement('div');

		movieE1.classList.add('movie');
		movieE1.innerHTML =
			`
			<img src="${IMG_URL+poster_path}" alt="${title}">
			<div class="movie-info">
				<h3>${title}</h3>


				<span class="${getColor(vote_average)}">${vote_average}</span>
			</div>
			<div class="overview">
				<h3>Sinopse</h3>
				${overview}
			</div>`

		main.appendChild(movieE1);
	})
}

function getColor(vote){
	if(vote>= 8){
		return 'green'
	} else if(vote >= 5){
		return 'orange'
	} else{
		return 'red'
	}
}


/* Pegar dados do form para o banco de dados*/
function cadastrarComentario(){
	event.preventDefault()
	let url = "http://localhost:3003/comentar"
	let nome = document.getElementById("nome").value
	let comentario = document.getElementById("comentario").value

	console.log(nome)
	console.log(comentario)

	body = {
        "name": nome,
        "comentario": comentario
    }
	enviar(url, body)
}

function enviar(url, body) {
    console.log("Body=", body)
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
		console.log(this.responseText)
    }

    return request.responseText
}

/*Pegar dados do Banco de dados e mostrar no HTML*/

function getComent(url){
	let request = new XMLHttpRequest()
	request.open("GET", url, false)
	request.send()
	return request.responseText
}

function showtab(comentario){
	linha = document.createElement("ul")
	tdNome = document.createElement("li")
	tdComentario = document.createElement("li")

	tdNome.innerHTML = comentario.nome
	tdComentario.innerHTML = comentario.comentario

	linha.appendChild(tdNome)
	linha.appendChild(tdComentario)

	return linha;
}

function tab(){
	data = getComent("http://localhost:3003/comentar")
	comentario = JSON.parse(data);
	console.log(comentario)

	let lista = document.getElementById("lista")

	comentario.forEach(element => {
		let linha = showtab(element)
		lista.appendChild(linha)
	})
}

tab()





/*const enviar = async()=>{

	event.preventDefault()

	/*Pega os valores do formulário */
/*	let nome = document.getElementById("nome").value
	let comentario = document.getElementById("comentario").value


	let response = fetch('http://localhost:3003/comentar',
	  {
		method:'post',
		body:JSON.stringify(
		  {
			nome,
        	comentario
		  }
		),
		mode: 'cors',
		headers:{
		  'Content-Type': 'application/json'
		}
	  }
	)
	.then((res)=> res.json())
	.then((data)=> data)
  }*/

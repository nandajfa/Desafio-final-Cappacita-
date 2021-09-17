const API_KEY = 'api_key=172c6271ccf9b86b8f65f98250a5e3fc'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?with_genres=36&language=pt-BR&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

const main = document.getElementById("main")

getMovies(API_URL);

function getMovies(url){

	fetch(url).then(res => res.json().then (data => {
		/*onsole.log(data.results)*/
		showMovies(data.results);
	}))
}

function showMovies(data){
	main.innerHTML = '';

	data.forEach(movie => {

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

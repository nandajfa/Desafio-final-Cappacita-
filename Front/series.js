

const API_KEY = 'api_key=172c6271ccf9b86b8f65f98250a5e3fc'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/tv?with_network=213&language=pt-BR&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

const main = document.getElementById("main")

getSeries(API_URL)

function getSeries(url){

	fetch(url).then(res => res.json().then (data => {
		console.log(data.results);
		showSeries(data.results);
	}))
}

function showSeries(data){
	main.innerHTML = '';

	data.forEach(serie => {

		const {name, poster_path, vote_average, overview, origin_country, first_air_date, genres} = serie;
		const serieE1 = document.createElement('div');

		serieE1.classList.add('serie');
		serieE1.innerHTML =
			`
			<img src="${IMG_URL+poster_path}" alt="${name}">
			<div class="serie-info">
				<h3>${name}</h3>
				<span class="${getColor(vote_average)}">${vote_average}</span>
			</div>
			<div class="overview">
				<div class="text"><h3 >${origin_country}</h3></div>
				<div class="text"><h3 >| ${first_air_date}</h3></div>
				<h3>Sinopse</h3>

				<div>${overview}</div>
			</div>`

		main.appendChild(serieE1);
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

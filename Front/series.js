
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

const main = document.getElementById("main")

async function getSerie() {
	try {
		const response = await fetch('http://localhost:3003/series')
		const data = await response.json()
		showSeries(data)
	} catch (error) {
		console.log(error)
	}
}

getSerie()

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

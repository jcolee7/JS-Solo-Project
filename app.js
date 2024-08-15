// Nav Search Bar Visibility
function searchActive(value){
	const input = document.querySelector(".nav__input")
	input.focus();
}

// Nav Search Enter
async function searchBarEnter(event){
	let value = document.querySelector(".nav__input").value
	const input = document.querySelector(".nav__input")

	if (event.keycode == 13 || event.which == 13){
		if (input === document.activeElement){
			searchResult(value)
			await moviesSearch(value)
			return setTimeout(() =>loadingDone(), 2000)
		}
		value = document.querySelector(".movie__input").value
		searchResult(value)
		await moviesSearch(value)
		setTimeout(() =>loadingDone(), 1000)
	}
}

// Search Icon
async function searchBarClick(){
	const value = document.querySelector(".movie__input").value

	searchResult(value)
	await moviesSearch(value)
	setTimeout(() =>loadingDone(), 1000)
}

// Input Search Bar Visibility

function searchResult(value){
	const searchBar= document.querySelector(".movie__top")

	const searchResult = document.querySelector(".movie__search__result")

	const searchBarHTML = `<h2 class="movie__search">Search results for:</h2>
	<h2 class="movie__search__result">"${value}"</h2>`

	searchBar.innerHTML = searchBarHTML

	searchBar.classList.add("movie__search__result-visible")
}

// Backend API

let globalMoviesData = []

async function moviesSearch(value){
	const movie = document.querySelector(".movies__list")
	movie.innerHTML=`<i class="fa-solid fa-spinner movies__list--loading movies__list--loading-visible"></i>`
	const response = await fetch(`https://www.omdbapi.com/?apikey=ba385a67&s=${value}`)
	const searchResult = await response.json()
	const moviesArray = searchResult.Search

	globalMoviesData = moviesArray

	const moviesHTML = moviesArray.map((movie) => `<div class="movie">
	<figure class="movie__image--wrapper">
	<img src=${movie.Poster} alt="" class="movie__image">
	<h4 class="movie__title">${movie.Title}</h4>
	</figure>
	</div>`).slice(0,6).join(" ")
	setTimeout(() => movie.innerHTML=moviesHTML, 1000)
	console.log('pending')
}

function loadingDone() {
	const targetMovie = document.querySelectorAll('.movie');

	const targetLoading = document.querySelector(".movies__list--loading");

	targetLoading.classList.remove("movies__list--loading-visible");
	targetMovie.forEach((movie) => movie.classList.remove("movie__invisible"))

	console.log('removed')
}
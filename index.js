import {
  closedEyeSVG,
  coloredHeartSVG,
  coloredStarSVG,
  heartSVG,
  openEyeSVG,
  starSVG,
} from "./utils.js";

class Movie {
  title;
  duration;
  score;
  #favorite;
  #watched;

  constructor(title, score, duration) {
    this.title = title;
    this.score = score;
    this.duration = duration;
    this.#favorite = false;
    this.#watched = false;
  }

  get favorite() {
    return this.#favorite;
  }

  set favorite(value) {
    this.#favorite = value;
  }

  get watched() {
    return this.#watched;
  }

  set watched(value) {
    this.#watched = value;
  }
}

const movies = [];

document
  .querySelector("#movie-register form")
  .addEventListener("submit", (event) => {
    console.log(event);
    event.preventDefault();
  });

document.getElementById("search-input").addEventListener("input", (e) => {
  filterMovies(e.target.value);
});

window.registerMovie = () => {
  const movie = getMovieFromForm();
  if (isMovieRegistered(movie.title))
    return alert("Já possui um filme com esse mesmo título.");

  movies.push(movie);
  alert("Filme adicionado com sucesso!");

  clearForm();
  listMovies(movies);
};

window.toggleWatched = (title) => {
  const index = getIndexOfMovie(title);
  movies[index].watched = !movies[index].watched;
  listMovies(movies);
};

window.toggleFavorite = (title) => {
  const index = getIndexOfMovie(title);
  movies[index].favorite = !movies[index].favorite;
  listMovies(movies);
};

function getIndexOfMovie(title) {
  return movies.findIndex((movie) => movie.title === title);
}

function getMovieFromForm() {
  const title = document.getElementById("movie-title-input").value;
  const score = document.getElementById("movie-score-input").value;
  const duration = document.getElementById("movie-duration-input").value;

  return new Movie(title, score, duration);
}

function clearForm() {
  document.getElementById("movie-title-input").value = "";
  document.getElementById("movie-score-input").value = "";
  document.getElementById("movie-duration-input").value = "";
}

function isMovieRegistered(title) {
  return movies.find((movie) => movie.title === title);
}

function listMovies(movies) {
  document.getElementById("movies-container").innerHTML = movies
    .map(
      (movie) => `
      <div class="card" id="${movie.title.toLowerCase()}">
      <div class="image-wrapper">
        <img
          src="https://cdn.shopify.com/s/files/1/0057/3728/3618/products/everything-everywhere-all-at-once_mpmkbaml_500x749.jpg?v=1649865955"
        />
        <div class="movie-icons">
          <button id="watched-btn" class="icon-btn" onclick="toggleWatched('${
            movie.title
          }')">
            ${movie.watched ? openEyeSVG : closedEyeSVG}
          </button>
          <button id="favorite-btn" class="icon-btn" onclick="toggleFavorite('${
            movie.title
          }')">
            ${movie.favorite ? coloredHeartSVG : heartSVG}
          </button>
        </div>
      </div>
      <div class="movie-info">
        <h4 class="movie-title">${movie.title}</h4>
        <div class="movie-details">
          <span class="duration">Duração: ${movie.duration}</span>
          <div class="score">
            ${getScore(movie.score)}
          </div>
        </div>
      </div>
    </div>
    `
    )
    .join("");
}

function getScore(score) {
  let scoreHTML = "";
  for (let i = 0; i < 5; i++) {
    if (i < score) {
      scoreHTML += coloredStarSVG;
      continue;
    }
    scoreHTML += starSVG;
  }

  return scoreHTML;
}

function filterMovies(filter) {
  const filteredMovies = movies.filter((movie) =>
    filter ? movie.title.toLowerCase().includes(filter.toLowerCase()) : true
  );

  if (!filteredMovies.length)
    alert("Não foi encontrado nenhum filme com esse titulo.");

  listMovies(filteredMovies.length ? filteredMovies : movies);
}

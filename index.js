import { icons } from "./utils.js";

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

window.updateMovie = (title, key) => {
  const index = getIndexOfMovie(title);
  const keyNewValue = !movies[index][key];

  if (key === "favorite" && keyNewValue && isMaxFavorites())
    return alert("Já existem três filmes favoritos");

  movies[index][key] = keyNewValue;

  if (key === "watched") updateTimeWatched();
  updateElement(title, key, keyNewValue);
};

function updateTimeWatched() {
  const totalMinutes = movies.reduce(
    (time, movie) => (time += movie.watched ? +movie.duration : 0),
    0
  );
  const time = getCalculatedTime(totalMinutes);

  document.getElementById("time-watched").querySelector("span").innerHTML = `${
    time.hours ? time.hours + " horas" : ""
  }${
    time.hours && time.minutes
      ? " e " + time.minutes + " minuto" + time.minutes
      : !time.hours
      ? time.minutes + " minuto"
      : ""
  }.`;
}

function getCalculatedTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

function isMaxFavorites() {
  return (
    movies.reduce((count, movie) => (count += movie.favorite ? 1 : 0), 0) >= 3
  );
}

function updateElement(id, key, isKeyActive) {
  document
    .getElementById(id.replaceAll(" ", "-"))
    .querySelector(`#${key}-btn`).innerHTML =
    icons[isKeyActive ? key : `not_${key}`];
}

function getIndexOfMovie(title) {
  return movies.findIndex((movie) => movie.title.toLowerCase() === title);
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
      <div class="card" id="${movie.title.toLowerCase().replaceAll(" ", "-")}">
      <div class="image-wrapper">
        <img
          src="https://cdn.shopify.com/s/files/1/0057/3728/3618/products/everything-everywhere-all-at-once_mpmkbaml_500x749.jpg?v=1649865955"
        />
        <div class="movie-icons">
          <button id="watched-btn" class="icon-btn" onclick="updateMovie('${movie.title.toLowerCase()}', 'watched')">
            ${movie.watched ? icons.watched : icons.not_watched}
          </button>
          <button id="favorite-btn" class="icon-btn" onclick="updateMovie('${movie.title.toLowerCase()}', 'favorite')">
            ${movie.favorite ? icons.favorite : icons.not_favorite}
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
      scoreHTML += icons.score;
      continue;
    }
    scoreHTML += icons.not_score;
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

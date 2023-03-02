import { DomController } from "../controllers/domController.js";
import { MoviesController } from "../controllers/moviesController.js";

document
  .querySelector("#movie-register form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
  });

document.getElementById("search-input").addEventListener("input", (e) => {
  filterMovies(e.target.value);
});

const moviesController = new MoviesController();
const domController = new DomController();

window.registerMovie = () => {
  const movie = domController.getMovieFromForm();
  if (moviesController.isMovieRegistered(movie.title))
    return alert("Já possui um filme com esse mesmo título.");

  moviesController.addMovie(movie);
  alert("Filme adicionado com sucesso!");

  domController.clearForm();
  domController.listMovies(moviesController.movies);
};

window.updateMovie = (title, key) => {
  const index = moviesController.getIndexOfMovie(title);
  const movies = moviesController.movies;
  const keyNewValue = !movies[index][key];

  if (key === "favorite" && keyNewValue && moviesController.isMaxFavorites())
    return alert("Já existem três filmes favoritos");

  movies[index][key] = keyNewValue;

  if (key === "watched") domController.updateTimeWatched(movies);
  domController.updateIconElement(title, key, keyNewValue);
};

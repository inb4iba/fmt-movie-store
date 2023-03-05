import { DomController } from "../controllers/domController.js";
import { MoviesController } from "../controllers/moviesController.js";

const moviesController = new MoviesController();
const domController = new DomController();

document
  .querySelector("#movie-register form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
  });

document.getElementById("search-input").addEventListener("input", (e) => {
  moviesController.filterMovies(e.target.value);
});

window.registerMovie = () => {
  const movie = domController.getMovieFromForm();
  if (moviesController.isMovieRegistered(movie.title))
    return alert("Já possui um filme com esse mesmo título.");

  moviesController.addMovie(movie);
  domController.addCard(movie);
  alert("Filme adicionado com sucesso!");

  domController.clearForm();
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

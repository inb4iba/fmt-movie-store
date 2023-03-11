import { DomController } from "../controllers/domController.js";
import { ModalController } from "../controllers/modalController.js";
import { MoviesController } from "../controllers/moviesController.js";
import { createInteractiveScore } from "./score.js";

const moviesController = new MoviesController();
const domController = new DomController();
const modalController = new ModalController();

document
  .querySelector("#modal-wrapper form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
  });

document.getElementById("search-input").addEventListener("input", (e) => {
  moviesController.filterMovies(e.target.value);
});

window.addMovieClicked = () => {
  modalController.openModal();
};

window.updateFormScore = (score) => {
  createInteractiveScore(score);
  document.getElementById("movie-score-input").value = score;
};

window.registerMovie = () => {
  const movie = domController.getMovieFromForm();
  if (moviesController.isMovieRegistered(movie.title))
    return alert("Já possui um filme com esse mesmo título.");

  moviesController.addMovie(movie);
  domController.addCard(movie);
  modalController.closeModal();
  alert("Filme adicionado com sucesso!");
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

createInteractiveScore();

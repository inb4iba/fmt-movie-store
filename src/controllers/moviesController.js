import { DomController } from "./domController.js";

const domController = new DomController();

export class MoviesController {
  #movies;

  constructor() {
    this.#movies = [];
  }

  get movies() {
    return this.#movies;
  }

  addMovie(movie) {
    this.#movies.push(movie);
  }

  isMaxFavorites() {
    return (
      this.#movies.reduce(
        (count, movie) => (count += movie.favorite ? 1 : 0),
        0
      ) >= 3
    );
  }

  getIndexOfMovie(title) {
    return this.#movies.findIndex(
      (movie) => movie.title.toLowerCase() === title
    );
  }

  isMovieRegistered(title) {
    return this.#movies.find((movie) => movie.title === title);
  }

  filterMovies(filter) {
    const filteredMovies = this.#movies.filter((movie) =>
      filter ? movie.title.toLowerCase().includes(filter.toLowerCase()) : true
    );

    if (!filteredMovies.length)
      alert("Não foi encontrado nenhum filme com esse titulo.");

    domController.listMovies(
      filteredMovies.length ? filteredMovies : this.#movies
    );
  }
}

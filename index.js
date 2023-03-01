document
  .querySelector("#movie-register form")
  .addEventListener("submit", (e) => e.preventDefault());

const movies = [];

function registerMovie() {
  const movie = getMovieFromForm();
  if (isMovieRegistered(movie.title))
    return alert("Já possui um filme com esse mesmo título.");

  movies.push(movie);
  alert("Filme adicionado com sucesso!");

  clearForm();
  console.log(movies);
}

function getMovieFromForm() {
  const title = document.getElementById("movie-title-input").value;
  const score = document.getElementById("movie-score-input").value;
  const duration = document.getElementById("movie-duration-input").value;

  return { title, score, duration, favorite: false, watched: false };
}

function clearForm() {
  document.getElementById("movie-title-input").value = "";
  document.getElementById("movie-score-input").value = "";
  document.getElementById("movie-duration-input").value = "";
}

function isMovieRegistered(title) {
  return movies.find((movie) => movie.title === title);
}

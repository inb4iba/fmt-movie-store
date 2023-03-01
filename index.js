const movies = [];

document
  .querySelector("#movie-register form")
  .addEventListener("submit", (e) => e.preventDefault());

document.getElementById("search-input").addEventListener("input", (e) => {
  filterMovies(e.target.value);
});

function registerMovie() {
  const movie = getMovieFromForm();
  if (isMovieRegistered(movie.title))
    return alert("Já possui um filme com esse mesmo título.");

  movies.push(movie);
  alert("Filme adicionado com sucesso!");

  clearForm();
  listMovies(movies);
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

function listMovies(movies) {
  document.getElementById("movies-container").innerHTML = movies
    .map(
      (movie) => `
        <div class="card">
            <div class="image-wrapper">
                <img src="https://via.placeholder.com/200x120">
            </div>
            <div class="movie-details">
                <p>${movie.title}</p>
                <p class="score">Nota: <span>${movie.score}</span></p>
                <p class="duration">Duração: <span>${movie.duration}</span></p>
            </div>
        </div>
    `
    )
    .join("");
}

function filterMovies(filter) {
  const filteredMovies = movies.filter((movie) =>
    filter ? movie.title.toLowerCase().includes(filter.toLowerCase()) : true
  );

  if (!filteredMovies.length)
    alert("Não foi encontrado nenhum filme com esse titulo.");

  listMovies(filteredMovies.length ? filteredMovies : movies);
}

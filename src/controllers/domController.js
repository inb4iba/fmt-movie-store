import { Movie } from "../models/Movie.js";
import { icons } from "../utils/icons.js";
import { calculatedTime } from "../scripts/calc.js";
import { getPoster } from "../scripts/posters.js";
import { createInteractiveScore } from "../scripts/score.js";

export class DomController {
  clearForm() {
    document.getElementById("movie-title-input").value = "";
    document.getElementById("movie-score-input").value = "";
    document.getElementById("movie-duration-input").value = "";
    createInteractiveScore();
  }

  getMovieFromForm() {
    const title = document.getElementById("movie-title-input").value;
    const score = document.getElementById("movie-score-input").value;
    const duration = document.getElementById("movie-duration-input").value;

    return new Movie(title, score, duration);
  }

  async listMovies(movies) {
    const container = document.getElementById("movies-container");
    container.innerHTML = `<button onclick="addMovieClicked()" id="add-movie-btn" class="card"><i class="ph-plus"></i></button>`;
    const cards = await Promise.all(
      movies.map(async (movie) => await this.#createCard(movie))
    );
    container.innerHTML += cards.join("");
  }

  async addCard(movie) {
    const container = document.getElementById("movies-container");
    container.innerHTML += await this.#createCard(movie);
  }

  updateIconElement(id, key, isKeyActive) {
    document
      .getElementById(id.replaceAll(" ", "-"))
      .querySelector(`.${key}-btn`).innerHTML =
      icons[isKeyActive ? key : `not_${key}`];
  }

  updateTimeWatched(movies) {
    const time = calculatedTime(movies);
    let timeStr = "";
    timeStr += time.hours ? time.hours + " hora" : "";
    timeStr += time.hours && time.hours !== 1 ? "s" : "";
    timeStr += time.hours && time.minutes ? " e " : "";
    timeStr += time.minutes ? time.minutes + " minuto" : "";
    timeStr += time.minutes && time.minutes !== 1 ? "s" : "";

    if (!timeStr) timeStr = "0 minutos";

    document.getElementById("time-watched").querySelector("span").innerHTML =
      timeStr + ".";
  }

  getScore(score) {
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

  async #createCard(movie) {
    return `
    <div class="card" id="${movie.title.toLowerCase().replaceAll(" ", "-")}">
    <div class="image-wrapper">
      <img
        src="${await getPoster(movie.title)}"
      />
      <div class="movie-icons">
        <button class="icon-btn watched-btn" onclick="updateMovie('${movie.title.toLowerCase()}', 'watched')">
          ${movie.watched ? icons.watched : icons.not_watched}
        </button>
        <button class="icon-btn favorite-btn" onclick="updateMovie('${movie.title.toLowerCase()}', 'favorite')">
          ${movie.favorite ? icons.favorite : icons.not_favorite}
        </button>
      </div>
    </div>
    <div class="movie-info">
      <div class="movie-title">${movie.title}</div>
      <div class="movie-details">
        <span class="duration">Duração: ${movie.duration}</span>
        <div class="score">
          ${this.getScore(movie.score)}
        </div>
      </div>
    </div>
  </div>
  `;
  }
}

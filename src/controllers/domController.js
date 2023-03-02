import { Movie } from "../models/Movie.js";
import { icons } from "../utils/icons.js";
import { calculatedTime } from "../scripts/calc.js";

export class DomController {
  clearForm() {
    document.getElementById("movie-title-input").value = "";
    document.getElementById("movie-score-input").value = "";
    document.getElementById("movie-duration-input").value = "";
  }

  getMovieFromForm() {
    const title = document.getElementById("movie-title-input").value;
    const score = document.getElementById("movie-score-input").value;
    const duration = document.getElementById("movie-duration-input").value;

    return new Movie(title, score, duration);
  }

  listMovies(movies) {
    document.getElementById("movies-container").innerHTML = movies
      .map(
        (movie) => `
          <div class="card" id="${movie.title
            .toLowerCase()
            .replaceAll(" ", "-")}">
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
                ${this.getScore(movie.score)}
              </div>
            </div>
          </div>
        </div>
        `
      )
      .join("");
  }

  updateIconElement(id, key, isKeyActive) {
    document
      .getElementById(id.replaceAll(" ", "-"))
      .querySelector(`#${key}-btn`).innerHTML =
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
}

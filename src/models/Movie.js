export class Movie {
  #title;
  #duration;
  #score;
  favorite;
  watched;

  constructor(title, score, duration) {
    this.#title = title;
    this.#score = score;
    this.#duration = duration;
    this.favorite = false;
    this.watched = false;
  }

  get title() {
    return this.#title;
  }

  get duration() {
    return this.#duration;
  }

  get score() {
    return this.#score;
  }
}

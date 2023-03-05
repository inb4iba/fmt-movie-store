async function getPoster(title) {
  const baseURL = "http://image.tmdb.org/t/p/w500";

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${title}`
  );
  const json = await res.json();

  return json.results.length
    ? baseURL + json.results[0].poster_path
    : "assets/no-image.jpg";
}

export { getPoster };

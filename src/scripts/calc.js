export function calculatedTime(movies) {
  const totalMinutes = movies.reduce(
    (time, movie) => (time += movie.watched ? +movie.duration : 0),
    0
  );

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

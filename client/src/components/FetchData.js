const API_KEY = "0c95577b9c6f99149dcce7a8abb721b4";

export const fetch_trending = () => {
  fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => this.setState({ info: data.results }));
};

export const fetch_query = (search) => {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}`
  )
    .then((response) => response.json())
    .then((data) =>
      this.setState({ info: data.results, search: search, query: "" })
    );
};

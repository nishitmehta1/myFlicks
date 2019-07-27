import React from "react";

const API_KEY = "0c95577b9c6f99149dcce7a8abb721b4";

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      id: "",
      release_date: "",
      genres: [],
      poster_path: "",
      overview: "",
      runtime: "",
      adult: false,
      box_office_collection: 0
    };
  }

  componentDidMount = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.match.params.id
      }?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          adult: data.adult,
          genres: data.genres,
          id: data.id,
          overview: data.overview,
          poster_path: "https://image.tmdb.org/t/p/w500" + data.poster_path,
          title: data.title,
          release_date: data.release_date,
          runtime: data.runtime,
          box_office_collection: data.revenue
        })
      );
  };

  render() {
    return (
      <div className="movie-container">
        <img src={this.state.poster_path} alt={this.state.title} />
        <div className="overview-container">
          <h1>{this.state.title}</h1>
          <p>
            <span>Release Date: </span>
            {this.state.release_date}
          </p>
          <p>
            <span>Box Office: </span>
            {this.state.box_office_collection}
          </p>
          <p>
            <span>Runtime: </span>
            {this.state.runtime}
          </p>
          <p>
            <span>Genres: </span>
            Genres
          </p>
          <p>
            <span>overview: </span>
            {this.state.overview}
          </p>
        </div>
      </div>
    );
  }
}

export default Movie;

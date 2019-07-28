import React from "react";
import "./Movie.css";

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
      budget: 0,
      box_office_collection: 0,
      status: "",
      cast: [
        { name: "N/A" },
        { name: "N/A" },
        { name: "N/A" },
        { name: "N/A" },
        { name: "N/A" }
      ]
    };
  }

  componentDidMount = async () => {
    await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }?api_key=${API_KEY}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }/credits?api_key=${API_KEY}`
      )
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) =>
        this.setState({
          adult: data1.adult,
          genres: data1.genres,
          id: data1.id,
          overview: data1.overview,
          poster_path: "https://image.tmdb.org/t/p/w500" + data1.poster_path,
          title: data1.title,
          release_date: data1.release_date,
          runtime: data1.runtime,
          budget: data1.budget,
          box_office_collection: data1.revenue,
          status: data1.status,
          cast: data2.cast
        })
      );

    /*previous method for fetching data*/

    // fetch(
    //   `https://api.themoviedb.org/3/movie/${
    //     this.props.match.params.id
    //   }?api_key=${API_KEY}&language=en-US`
    // )
    //   .then((res) => res.json())
    //   .then((data) =>
    //     this.setState({
    //       adult: data.adult,
    //       genres: data.genres,
    //       id: data.id,
    //       overview: data.overview,
    //       poster_path: "https://image.tmdb.org/t/p/w500" + data.poster_path,
    //       title: data.title,
    //       release_date: data.release_date,
    //       runtime: data.runtime,
    //       budget: data.budget,
    //       box_office_collection: data.revenue,
    //       status: data.status
    //     })
    //   );

    // fetch(
    //   `https://api.themoviedb.org/3/movie/${
    //     this.props.match.params.id
    //   }/credits?api_key=${API_KEY}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => this.setState({ cast: data.cast }));
  };

  render() {
    let display_genres = "";
    for (var i = 0; i < this.state.genres.length; i++) {
      if (i === this.state.genres.length - 1) {
        display_genres += this.state.genres[i].name + ".";
      } else {
        display_genres += this.state.genres[i].name + ", ";
      }
    }

    let topCast = "";
    for (var j = 0; j < 5; j++) {
      if (j === 4) {
        topCast += this.state.cast[j].name + ".";
      } else {
        topCast += this.state.cast[j].name + ", ";
      }
    }

    // console.log(this.state.cast[0].name);

    return (
      <div className="movie-container">
        <div className="image-container">
          <img src={this.state.poster_path} alt={this.state.title} />
        </div>

        <div className="overview-container">
          <h1>{this.state.title}</h1>
          <p>
            <span>Release Date: </span>
            {this.state.release_date}
          </p>
          <p>
            <span>Budget: </span>
            {Number.isInteger(this.state.budget / 10 ** 6)
              ? this.state.budget / 10 ** 6
              : (this.state.budget / 10 ** 6).toFixed(2)}{" "}
            million USD
          </p>
          <p>
            <span>Box Office: </span>
            {Number.isInteger(this.state.box_office_collection / 10 ** 6)
              ? this.state.box_office_collection / 10 ** 6
              : (this.state.box_office_collection / 10 ** 6).toFixed(2)}{" "}
            million USD
          </p>
          <p>
            <span>Runtime: </span>
            {this.state.runtime} min
          </p>
          <p>
            <span>Status: </span>
            {this.state.status}
          </p>
          <div>
            <span>Cast: </span>
            <ul>{topCast}</ul>
          </div>
          <div>
            <span>Genres: </span>
            <ul>{display_genres}</ul>
          </div>
          <div>
            <span>overview: </span>
            <br />
            {this.state.overview}
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;

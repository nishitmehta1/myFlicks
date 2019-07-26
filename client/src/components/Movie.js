import React from "react";

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overview: ""
    };
  }

  render() {
    return (
      <div className="movie-container">
        <img src="" alt="" />
        <div className="overview-container">
          <h1>{}</h1>
          <p>
            <span>Release Date: </span>
            {}
          </p>
          <p>
            <span>Genres: </span>
            {}
          </p>
          <p>
            <span>overview: </span>
          </p>
        </div>
      </div>
    );
  }
}

export default Movie;

import React, { Component } from "react";
import axios from "axios";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addWatchList = (id) => {
    let movie = {
      watchlist: id.toString()
    };
    axios
      .post("http://localhost:4000/users/addToWatchList", movie, {
        withCredentials: true
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  render() {
    const { id, src, title, release_date, login } = this.props;
    return (
      <div className="card" style={{ width: "18rem" }}>
        <div className="image-container">
          <img className="card-img-top" src={src} alt={title} />
          {login ? (
            <button onClick={() => this.addWatchList(id)}>
              <i className="far fa-heart" />
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            <span>Release Date: </span>
            {release_date}
          </p>
        </div>
      </div>
    );
  }
}

export default Movie;

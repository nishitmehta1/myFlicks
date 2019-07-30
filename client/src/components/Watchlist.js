import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import "./Watchlist.css";

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: []
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:4000/users/getWatchList", {
        withCredentials: true
      })
      .then((res) => this.setState({ moviesList: res.data.data }))
      .catch((err) => console.log("Error while fetching data", err));
  };

  render() {
    // console.log(this.state.moviesList);
    const watchList = this.state.moviesList.map((movie) => (
      <div className="card" key={movie.id} style={{ width: "18rem" }}>
        <div className="image-container">
          <Link to={`movie/${movie.id}`}>
            <img
              className="card-img-top movie-img"
              src={movie.image}
              alt={movie.title}
            />
          </Link>
        </div>

        <div className="card-body">
          <Link to={`movie/${movie.id}`} className="a_card_title">
            <h5 className="card-title">{movie.title}</h5>
          </Link>

          <p className="card-text">
            <span>Release Date: </span>
            {movie.release_date}
          </p>
        </div>
      </div>
    ));

    return <div className="watchlist">{watchList}</div>;
  }
}

export default withRouter(Watchlist);
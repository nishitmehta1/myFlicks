import React from "react";
import axios from "axios";

const Movie = (props) => {
  const { id, src, title, release_date } = props;

  const addWatchList = (id) => {
    axios
      .post("http://localhost:4000/users/addToWatchList", id)
      .then((res) => console.log(res.data));
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="image-container">
        <img className="card-img-top" src={src} alt={title} />
        <button onClick={addWatchList(id)}>
          <i className="fas fa-plus" />
        </button>
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
};

export default Movie;

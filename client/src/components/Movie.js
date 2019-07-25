import React from "react";

const Movie = (props) => {
  const { src, title, release_date } = props;
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="image-container">
        <img className="card-img-top" src={src} alt={title} />
        <i className="fas fa-plus" />
      </div>

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          <span>Release Date:</span>
          {release_date}
        </p>
      </div>
    </div>
  );
};

export default Movie;

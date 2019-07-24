import React from "react";

const Movie = (props) => {
  const { src, title, release_date } = props;
  return (
    <div>
      <img src={src} alt={title} />
      <p>{title}</p>
      <p>
        <span>Release Date:</span>
        {release_date}
      </p>
    </div>
  );
};

export default Movie;

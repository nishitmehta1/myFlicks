import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movie extends Component {
  render() {
    const { id, src, title, release_date, login, inList } = this.props;

    return (
      <div className='card' style={{ width: '18rem' }}>
        <div className='image-container'>
          <Link to={`movie/${id}`} className='btn btn-dark btn-block'>
            <img className='card-img-top' src={src} alt={title} />
          </Link>
        </div>
        {login ? (
          <button
            className='watchlist_icon'
            onClick={() => this.props.toggleWatchList(id, inList)}
          >
            {inList ? (
              <i className='fa fa-check fa-2x' />
            ) : (
              <i className='fa fa-plus-square fa-2x' />
            )}
          </button>
        ) : (
          ''
        )}

        <div className='card-body'>
          <Link to={`movie/${id}`}>
            <h5 className='card-title'>{title}</h5>
          </Link>

          <p className='card-text'>
            <span>Release Date: </span>
            {release_date}
          </p>
        </div>
      </div>
    );
  }
}

export default Movie;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movie extends Component {
  render() {
    const { id, src, title, release_date, login, inList } = this.props;
    const url = 'https://image.tmdb.org/t/p/w300';

    let img_src = '';
    if (src === null) {
      img_src = 'https://picsum.photos/id/1025/300/200';
    } else {
      img_src = url + src;
    }

    return (
      <div className='card' style={{ width: '18rem' }}>
        <div className='image-container'>
          <Link to={`movie/${id}`}>
            <img className='card-img-top movie-img' src={img_src} alt={title} />
          </Link>
        </div>
        {login ? (
          <button
            className='watchlist_icon'
            onClick={() =>
              this.props.toggleWatchList(
                id,
                title,
                img_src,
                release_date,
                inList
              )
            }
            data-toggle='tooltip'
            data-placement='top'
            title={`${inList ? 'Remove from' : 'Add to'} your watchlist`}
          >
            {inList ? (
              <i className='fa fa-check fa-2x' alt='TEST' />
            ) : (
              <i className='fa fa-plus fa-2x' />
            )}
          </button>
        ) : (
          ''
        )}

        <div className='card-body'>
          <Link to={`movie/${id}`} className='a_card_title'>
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

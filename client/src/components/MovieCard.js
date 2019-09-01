import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movie extends Component {
  render() {
    const {
      id,
      src,
      title,
      release_date,
      login,
      inList,
      from,
      image
    } = this.props;
    const url = 'https://image.tmdb.org/t/p/w300';

    let img_src = '';
    if (from === 'userpage') {
      img_src = image;
    } else if (src === null) {
      img_src = 'https://picsum.photos/id/1025/300/200';
    } else {
      img_src = url + src;
    }

    return (
      <div
        className='card movie-card'
        style={from === 'userpage' ? { width: '14rem' } : { width: '21rem' }}
      >
        <div className='image-container'>
          <Link to={`/movie/${id}`} className='link'>
            <img className='card-img-top movie-img' src={img_src} alt={title} />
          </Link>
          <div className='text hover'>
            <span className='movie-card-title'>{title}</span>
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
                <button
                  className='addList-btn hover'
                  data-toggle='modal'
                  data-target='#rateModal'
                >
                  <i className='fa fa-plus fa-2x' />
                </button>
              )}
            </button>
          ) : (
            ''
          )}
        </div>
        <div
          class='modal fade'
          id='rateModal'
          tabindex='-1'
          role='dialog'
          aria-labelledby='rateModal'
          aria-hidden='true'
        >
          <div class='modal-dialog modal-dialog-centered' role='document'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h5 class='modal-title' id='exampleModalLongTitle'>
                  How was it?
                </h5>
                <button
                  type='button'
                  class='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div class='modal-body'>
                <div class='rate-main'>
                  {/* TODO: USE COLUMN REVERSE FOR HOVER EFFECT */}
                  <div className='rate'>
                    <input type='radio' id='star5' name='rate' value='5' />
                    <div className='for5Star'>Loved it</div>
                    <label for='star5' title='5 stars'>
                      5 stars
                    </label>
                    <input type='radio' id='star4' name='rate' value='4' />
                    <div className='for4Star'>Liked it</div>
                    <label for='star4' title='4 stars'>
                      4 stars
                    </label>
                    <input type='radio' id='star3' name='rate' value='3' />
                    <div className='for3Star'>Average</div>
                    <label for='star3' title='3 stars'>
                      3 stars
                    </label>
                    <input type='radio' id='star2' name='rate' value='2' />
                    <div className='for2Star'>Poor</div>
                    <label for='star2' title='2 stars'>
                      2 stars
                    </label>
                    <input type='radio' id='star1' name='rate' value='1' />
                    <div className='for1Star'>Horrible</div>
                    <label for='star1' title='1 stars'>
                      1 star
                    </label>
                  </div>
                  {/* <div className='starLevel'>
                  </div> */}
                </div>
              </div>
              {/* <div class='modal-footer'>
                <button
                  type='button'
                  class='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Close
                </button>
                <button type='button' class='btn btn-primary'>
                  Save changes
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* <div className='card-body'>
          <Link to={`/movie/${id}`} className='a_card_title'>
            <h5 className='card-title'>{title}</h5>
          </Link>

          <p className='card-text'>
            <span>Release Date: </span>
            {release_date}
          </p>
        </div> */}
      </div>
    );
  }
}

export default Movie;

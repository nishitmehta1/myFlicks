import React, { Component } from 'react';
import './slider.css';
import { withRouter, Link } from 'react-router-dom';
var ColorThief = require('color-thief');

class Slider extends Component {
  render() {
    let poster_path = ['', '', '', '', '', ''];
    let movie_id = ['', '', '', '', '', ''];
    poster_path =
      this.props.slider_img.length > 0
        ? this.props.slider_img.map(
            (movie, i) => (poster_path[i] = movie.poster_path)
          )
        : '';
    let colorThief = new ColorThief();

    let movie_id_temp =
      this.props.slider_img.length > 0
        ? this.props.slider_img.map(function(movie, i) {
            movie_id[i] = movie.id;
            let img = document.querySelector(`.slider-img-${i + 1}`);
            if (img) {
              img.addEventListener('load', () => {
                let temp = colorThief.getColor(img);
                let temp1 = colorThief.getPalette(img);
                document.querySelector(
                  `.carousel-item${i + 1}`
                ).style.background = `linear-gradient(rgb(${temp[0]}, ${
                  temp[1]
                }, ${temp[2]}), rgba(${temp1[0][0]},${temp1[0][1]},${
                  temp1[0][2]
                },1) 70.71%)`;
              });
              img.crossOrigin = 'Anonymous';
            }
          })
        : '';

    return (
      <div>
        <div
          id='carouselExampleControls'
          className='carousel slide carousel-fade'
          data-ride='carousel'
        >
          <div className='carousel-inner'>
            <div className='carousel-item carousel-item1 active'>
              <Link to={`/movie/${movie_id[0]}`} className='link'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path[0]}`}
                  className='slider-img-1 d-block'
                  alt='...'
                />
              </Link>
            </div>
            <div className='carousel-item carousel-item2'>
              <Link to={`/movie/${movie_id[1]}`} className='link'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path[1]}`}
                  className='slider-img-2 d-block'
                  alt='...'
                />
              </Link>
            </div>
            <div className='carousel-item carousel-item3'>
              <Link to={`/movie/${movie_id[2]}`} className='link'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path[2]}`}
                  className='slider-img-3 d-block'
                  alt='...'
                />
              </Link>
            </div>
            <div className='carousel-item carousel-item4'>
              <Link to={`/movie/${movie_id[3]}`} className='link'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path[3]}`}
                  className='slider-img-4 d-block'
                  alt='...'
                />
              </Link>
            </div>
            <div className='carousel-item carousel-item5'>
              <Link to={`/movie/${movie_id[4]}`} className='link'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path[4]}`}
                  className='slider-img-5 d-block'
                  alt='...'
                />
              </Link>
            </div>
            <div className='carousel-item carousel-item6'>
              <Link to={`/movie/${movie_id[5]}`} className='link'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path[5]}`}
                  className='slider-img-6 d-block'
                  alt='...'
                />
              </Link>
            </div>
          </div>
          <a
            className='carousel-control-prev'
            href='#carouselExampleControls'
            role='button'
            data-slide='prev'
          >
            <span
              className='carousel-control-prev-icon'
              aria-hidden='true'
            ></span>
            <span className='sr-only'>Previous</span>
          </a>
          <a
            className='carousel-control-next'
            href='#carouselExampleControls'
            role='button'
            data-slide='next'
          >
            <span
              className='carousel-control-next-icon'
              aria-hidden='true'
            ></span>
            <span className='sr-only'>Next</span>
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(Slider);

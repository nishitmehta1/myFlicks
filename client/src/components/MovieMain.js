import React, { Component } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';

class MovieMain extends Component {
  toggleWatchList = async (id, inList) => {
    let movie = {
      watchlist: id.toString()
    };

    if (!inList) {
      await axios
        .post('http://localhost:4000/users/addToWatchList', movie, {
          withCredentials: true
        })
        .then(res => {
          console.log(res.data);
        });
    } else {
      await axios
        .post('http://localhost:4000/users/deleteWatchList', movie, {
          withCredentials: true
        })
        .then(res => {
          console.log(res.data);
        });
    }
    this.props.checkWatchListToState(movie);
  };

  render() {
    const url = 'https://image.tmdb.org/t/p/w300';
    return (
      <div className='movies-list'>
        {this.props.info.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            login={this.props.login}
            src={url + movie.backdrop_path}
            title={movie.title}
            release_date={movie.release_date}
            toggleWatchList={this.toggleWatchList}
            watchlist={this.props.watchlist}
            inList={
              this.props.watchlist.indexOf(movie.id.toString()) === -1
                ? false
                : true
            }
          />
        ))}
      </div>
    );
  }
}

export default MovieMain;

import React, { Component } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';

class MovieMain extends Component {
  addWatchList = async id => {
    let movie = {
      watchlist: id.toString()
    };
    await axios
      .post('http://localhost:4000/users/addToWatchList', movie, {
        withCredentials: true
      })
      .then(res => {
        console.log(res.data);
      });
    this.props.addWatchListToState(movie);
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
            addWatchList={this.addWatchList}
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

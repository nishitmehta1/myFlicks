import React, { Component } from 'react';
import Search from './Search';
import Movie from './Movie';

const API_KEY = '0c95577b9c6f99149dcce7a8abb721b4';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      query: '',
      info: []
    };
  }

  componentDidMount = () => {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          info: data.results
        })
      );
  };

  handleChange = e => {
    const search = e.target.value;
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}`
    )
      .then(response => response.json())
      .then(data =>
        this.setState({ info: data.results, search: search, query: '' })
      );
  };

  handleSubmit = e => {
    e.preventDefault();
    const query = this.state.search;
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
    )
      .then(response => response.json())
      .then(data =>
        this.setState({ info: data.results, search: '', query: query })
      );
  };
  render() {
    const url = 'https://image.tmdb.org/t/p/w300';
    const movies = this.state.info.map(movie => (
      <Movie
        key={movie.id}
        src={url + movie.backdrop_path}
        title={movie.title}
        release_date={movie.release_date}
      />
    ));
    return (
      <div className='app'>
        <h1>MyFlicks</h1>
        <div className='search-bar'>
          <Search
            change={this.handleChange}
            submit={this.handleSubmit}
            search={this.state.search}
          />
        </div>

        <div className='movies-list'>{movies}</div>
      </div>
    );
  }
}

export default Main;

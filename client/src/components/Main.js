import React, { Component } from 'react';
import Search from './Search';
import Movie from './Movie';
import axios from 'axios';

const API_KEY = '0c95577b9c6f99149dcce7a8abb721b4';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      query: '',
      info: [],
      login: false
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
    axios
      .get('http://localhost:4000/users/', { withCredentials: true })
      .then(res => {
        console.log(res.data.data);
        if (res.data.data === 'LOGGEDIN') {
          this.setState({
            login: true
          });
        } else if (res.data.data === 'LOGIN') {
          this.setState({
            login: false
          });
        }
      });
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

  onLogoutClick = () => {
    axios
      .get('http://localhost:4000/users/logout', { withCredentials: true })
      .then(res => {
        if (res.data.data === 'LOGIN') {
          this.setState({
            login: false
          });
        }
      });
  };

  onLoginClick = () => {
    this.props.history.push('/login');
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
        {this.state.login ? (
          <button
            style={{ width: '10rem' }}
            className='btn btn-primary btn-lg logout'
            onClick={this.onLogoutClick}
          >
            Logout
          </button>
        ) : (
          <button
            style={{ width: '10rem' }}
            className='btn btn-primary btn-lg login'
            onClick={this.onLoginClick}
          >
            Login
          </button>
        )}
        <div className='movies-list'>{movies}</div>
      </div>
    );
  }
}

export default Main;

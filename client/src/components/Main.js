import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Search from './Search';
import MovieMain from './MovieMain';
import axios from 'axios';

const API_KEY = '0c95577b9c6f99149dcce7a8abb721b4';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      query: '',
      info: [],
      login: false,
      firstname: '',
      lastname: '',
      user: {},
      watchlist: []
    };
  }

  componentWillMount = () => {
    axios
      .get('http://localhost:4000/users/', { withCredentials: true })
      .then(res => {
        // console.log(res.data);
        if (res.data.data === 'LOGGEDIN') {
          this.setState({
            login: true,
            user: res.data.user,
            firstname: res.data.user.name.first,
            lastname: res.data.user.name.last,
            watchlist: res.data.user.watchlist
          });
          // console.log(this.state.user);
        } else if (res.data.data === 'LOGIN') {
          this.setState({
            login: false
          });
        }
      });
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          info: data.results,
          search: ''
        })
      );
  };

  handleChange = e => {
    const search = e.target.value;

    if (search === '') {
      fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
        .then(response => response.json())
        .then(data =>
          this.setState({
            info: data.results,
            search: ''
          })
        );
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}`
      )
        .then(response => response.json())
        .then(data => this.setState({ info: data.results, search: search }));
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const search_term = this.state.search;
    if (search_term === '') {
      fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
        .then(response => response.json())
        .then(data =>
          this.setState({
            info: data.results,
            search: ''
          })
        );
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search_term}`
      )
        .then(response => response.json())
        .then(data => this.setState({ info: data.results, search: '' }));
    }
  };

  addWatchListToState = movie => {
    this.setState({
      watchlist: [...this.state.watchlist, movie.watchlist]
    });
  };

  onLogoutClick = () => {
    axios
      .get('http://localhost:4000/users/logout', { withCredentials: true })
      .then(res => {
        if (res.data.data === 'LOGIN') {
          this.setState({
            login: false,
            firstname: '',
            lastname: ''
          });
        }
      });
  };

  onLoginClick = () => {
    this.props.history.push('/login');
  };

  render() {
<<<<<<< HEAD
    const url = "https://image.tmdb.org/t/p/w300";
    const movies = this.state.info.map((movie) => (
      <MovieCard
        key={movie.id}
        id={movie.id}
        src={url + movie.backdrop_path}
        title={movie.title}
        release_date={movie.release_date}
        login={this.state.login}
      />
    ));
=======
    const { watchlist } = this.state;
>>>>>>> 16de3fd15c93954633e8a0f263d801a2ef927742
    return (
      <div className='app'>
        <header>
          <h1 className='header'>MyFlicks</h1>
        </header>

        <div className='search-bar'>
          <Search
            change={this.handleChange}
            submit={this.handleSubmit}
            search={this.state.search}
          />
        </div>
        {this.state.login ? (
          <div>
            <button
              style={{ width: '10rem' }}
              className='btn btn-primary btn-lg logout'
              onClick={this.onLogoutClick}
            >
              Logout
            </button>
            <h4>Hello, {this.state.firstname}</h4>
          </div>
        ) : (
          <div>
            <button
              style={{ width: '10rem' }}
              className='btn btn-primary btn-lg login'
              onClick={this.onLoginClick}
            >
              Login
            </button>
          </div>
        )}
        <div className='movies-main'>
          <MovieMain
            addWatchListToState={this.addWatchListToState}
            login={this.state.login}
            watchlist={watchlist}
            info={this.state.info}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Main);

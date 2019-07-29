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
      query: '',
      info: [],
      trending: [],
      login: false,
      firstname: '',
      lastname: '',
      user: {},
      watchlist: [],
      notFound: false,
      search: ''
    };
  }

  componentDidMount = async () => {
    console.log('DID MOUNT');
    await axios
      .get('http://localhost:4000/users/', { withCredentials: true })
      .then(res => {
        if (res.data.data === 'LOGGEDIN') {
          this.setState({
            login: true,
            user: res.data.user,
            firstname: res.data.user.name.first,
            lastname: res.data.user.name.last,
            watchlist: res.data.user.watchlist
          });
        } else if (res.data.data === 'LOGIN') {
          this.setState({
            login: false
          });
        }
      });
    await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          info: data.results,
          trending: data.results,
          search: ''
        })
      );
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

  handleChange = (info, search) => {
    console.log(info);
    if (info.length !== 0 && search.length !== 0) {
      this.setState({
        info: info,
        notFound: false
      });
    } else if (info.length === 0 && search.length !== 0) {
      this.setState({
        info: this.state.trending,
        notFound: true,
        search: search
      });
    } else {
      this.setState({
        info: this.state.trending,
        notFound: false
      });
    }
  };

  onLoginClick = () => {
    this.props.history.push('/login');
  };

  checkWatchListToState = async () => {
    await axios
      .get('http://localhost:4000/users/getWatchList', {
        withCredentials: true
      })
      .then(res => {
        this.setState({
          watchlist: res.data.data
        });
      });
  };

  render() {
    const { watchlist } = this.state;
    return (
      <div className='app'>
        <div className='search-bar'>
          <Search change={this.handleChange} />
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
          {this.state.notFound ? (
            <div className='container'>
              <h4>No such movie found</h4>
            </div>
          ) : (
            <MovieMain
              checkWatchListToState={this.checkWatchListToState}
              login={this.state.login}
              watchlist={watchlist}
              info={this.state.info}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Main);

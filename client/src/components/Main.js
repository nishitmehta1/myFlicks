import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Search from "./Search";
import MovieCard from "./MovieCard";
import axios from "axios";

const API_KEY = "0c95577b9c6f99149dcce7a8abb721b4";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      query: "",
      info: [],
      login: false,
      firstname: "",
      lastname: "",
      user: {}
    };
  }

  componentDidMount = () => {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          info: data.results,
          search: ""
        })
      );
    axios
      .get("http://localhost:4000/users/", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.data === "LOGGEDIN") {
          this.setState({
            login: true,
            user: res.data.user,
            firstname: res.data.user.name.first,
            lastname: res.data.user.name.last
          });
          console.log(this.state.user);
        } else if (res.data.data === "LOGIN") {
          this.setState({
            login: false
          });
        }
      });
  };

  handleChange = (e) => {
    const search = e.target.value;

    if (search === "") {
      fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            info: data.results,
            search: ""
          })
        );
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}`
      )
        .then((response) => response.json())
        .then((data) => this.setState({ info: data.results, search: search }));
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const search_term = this.state.search;
    if (search_term === "") {
      fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            info: data.results,
            search: ""
          })
        );
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search_term}`
      )
        .then((response) => response.json())
        .then((data) => this.setState({ info: data.results, search: "" }));
    }
  };

  onLogoutClick = () => {
    axios
      .get("http://localhost:4000/users/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.data === "LOGIN") {
          this.setState({
            login: false,
            firstname: "",
            lastname: ""
          });
        }
      });
  };

  onLoginClick = () => {
    this.props.history.push("/login");
  };

  render() {
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
    return (
      <div className="app">
        <header>
          <h1 className="header">MyFlicks</h1>
        </header>

        <div className="search-bar">
          <Search
            change={this.handleChange}
            submit={this.handleSubmit}
            search={this.state.search}
          />
        </div>
        {this.state.login ? (
          <div>
            <button
              style={{ width: "10rem" }}
              className="btn btn-primary btn-lg logout"
              onClick={this.onLogoutClick}
            >
              Logout
            </button>
            <h4>Hello, {this.state.firstname}</h4>
          </div>
        ) : (
          <div>
            <button
              style={{ width: "10rem" }}
              className="btn btn-primary btn-lg login"
              onClick={this.onLoginClick}
            >
              Login
            </button>
          </div>
        )}
        <div className="movies-list">{movies}</div>
      </div>
    );
  }
}

export default withRouter(Main);

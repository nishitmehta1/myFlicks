import React, { Component } from 'react';

const API_KEY = '0c95577b9c6f99149dcce7a8abb721b4';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      search: '',
      trending: []
    };
  }

  handleChange = async e => {
    const search = e.target.value;
    if (search === '') {
      this.setState(
        {
          info: [],
          search: ''
        },
        () => {
          this.props.change(this.state.info);
        }
      );
    } else {
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}`
      )
        .then(response => response.json())
        .then(data =>
          this.setState({ info: data.results, search: search }, () => {
            this.props.change(this.state.info);
          })
        );
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const search_term = this.state.search;
    if (search_term === '') {
      this.setState({
        info: this.props.trending,
        search: ''
      });
    } else {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search_term}`
      )
        .then(response => response.json())
        .then(data => this.setState({ info: data.results, search: '' }));
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className='input-bar'
            placeholder='Search for a movie'
            name='search'
            value={this.state.search}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>search</button>
        </form>
      </div>
    );
  }
}

export default Search;

import React from 'react';
import { withRouter } from 'react-router-dom';
import './Movie.css';

const API_KEY = '0c95577b9c6f99149dcce7a8abb721b4';

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      id: '',
      release_date: '',
      genres: [],
      poster_path: '',
      overview: '',
      runtime: '',
      adult: false,
      budget: 0,
      box_office_collection: 0,
      status: '',
      cast: []
    };
  }

  componentWillMount = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.match.params.id
      }?api_key=${API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          adult: data.adult,
          genres: data.genres,
          id: data.id,
          overview: data.overview,
          poster_path: 'https://image.tmdb.org/t/p/w500' + data.poster_path,
          title: data.title,
          release_date: data.release_date,
          runtime: data.runtime,
          budget: data.budget,
          box_office_collection: data.revenue,
          status: data.status
        })
      );

    fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.match.params.id
      }/credits?api_key=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => this.setState({ cast: data.cast }));
  };

  render() {
    const display_genres = this.state.genres.map(i => (
      <li key={i.id}>{i.name}</li>
    ));

    console.log(this.state.cast[0]);

    return (
      <div className='movie-container'>
        <div className='back-button-div'>
          <button
            className='back-button'
            onClick={() => {
              this.props.history.push('/');
            }}
          >
            <i class='fa fa-long-arrow-left' />
            Back
          </button>
        </div>
        <div className='image-container'>
          <img src={this.state.poster_path} alt={this.state.title} />
        </div>

        <div className='overview-container'>
          <h1>{this.state.title}</h1>
          <p>
            <span>Release Date: </span>
            {this.state.release_date}
          </p>
          <p>
            <span>Budget: </span>
            {Number.isInteger(this.state.budget / 10 ** 6)
              ? this.state.budget / 10 ** 6
              : (this.state.budget / 10 ** 6).toFixed(2)}{' '}
            million USD
          </p>
          <p>
            <span>Box Office: </span>
            {Number.isInteger(this.state.box_office_collection / 10 ** 6)
              ? this.state.box_office_collection / 10 ** 6
              : (this.state.box_office_collection / 10 ** 6).toFixed(2)}{' '}
            million USD
          </p>
          <p>
            <span>Runtime: </span>
            {this.state.runtime} min
          </p>
          <p>
            <span>Status: </span>
            {this.state.status}
          </p>
          <div>
            <span>Cast: </span>
            <ul>{}</ul>
          </div>
          <div>
            <span>Genres: </span>
            <ul>{display_genres}</ul>
          </div>
          <p>
            <span>overview: </span>
            {this.state.overview}
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Movie);

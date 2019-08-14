import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import './userpage.css';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: {
          first: '',
          last: ''
        },
        profilepic: '',
        watchlist: [],
        friendlist: [],
        wishlist: []
      }
    };
  }

  componentDidMount() {
    axios.get(`/users/getUser/${this.props.match.params.id}`).then(res =>
      this.setState({
        user: res.data.data
      })
    );
  }

  render() {
    const {
      name,
      profilepic,
      watchlist,
      friendlist,
      wishlist
    } = this.state.user;

    const movieList =
      watchlist.length > 0
        ? watchlist.map(movie => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              from='userpage'
              image={movie.image}
              login={this.props.login}
              title={movie.title}
              release_date={movie.release_date}
              toggleWatchList={this.toggleWatchList}
              watchlist={this.props.watchlist}
              // inList={this.props.watchlist.some(function(id) {
              //   return id.id === movie.id.toString();
              // })}
            />
          ))
        : 'No movies in this list';

    return (
      <div class='container userpage-main'>
        <div class='row profile'>
          <div class='col-md-3'>
            <div class='profile-sidebar'>
              <div class='profile-userpic'>
                <img src={`${profilepic}`} class='img-responsive' alt='' />
              </div>
              <div class='profile-usertitle'>
                <div class='profile-usertitle-name'>
                  {name.first} {name.last}
                </div>
                <div class='profile-usertitle-job'>Developer</div>
              </div>
              <div class='profile-userbuttons'>
                <button type='button' class='btn btn-success btn-sm'>
                  Follow
                </button>
                <button type='button' class='btn btn-danger btn-sm'>
                  Message
                </button>
              </div>
              {/* <div class='profile-usermenu'>
                <ul class='nav'>
                  <li class='active'>
                    <a href='#'>
                      <i class='glyphicon glyphicon-home' />
                      Overview{' '}
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='glyphicon glyphicon-user' />
                      Account Settings{' '}
                    </a>
                  </li>
                  <li>
                    <a href='#' target='_blank'>
                      <i class='glyphicon glyphicon-ok' />
                      Tasks{' '}
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i class='glyphicon glyphicon-flag' />
                      Help{' '}
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
          <div class='col-md-9'>
            <div class='profile-content'>
              <h4>{`${name.first}'s Watchlist:`}</h4>
              <div className='profile-watchlist-content'>{movieList}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;

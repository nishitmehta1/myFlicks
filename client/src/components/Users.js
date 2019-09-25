import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      user: {
        name: {
          first: '',
          last: ''
        },
        profilepic: '',
        watchlist: [],
        friendlist: [],
        wishlist: []
      },
      myWatchlist: [],
      myFriendlist: [],
      isFriend: false
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props._id
    });

    axios.get(`/users/getUser/${this.props._id}`).then(res =>
      this.setState({
        user: res.data.data
      })
    );
    this.checkFriendlistToState();
  }

  checkFriendlistToState = async () => {
    await axios.get('/users/', { withCredentials: true }).then(res => {
      if (res.data.data === 'LOGIN') {
        this.props.history.push('/login');
      }
    });

    await axios
      .get('/users/getFriendList', {
        withCredentials: true
      })
      .then(res => {
        this.setState(
          {
            myFriendlist: res.data.data
          },
          () => {
            let myFriendlist = this.state.myFriendlist;
            if (
              myFriendlist.some(id => {
                return id.id === this.props._id;
              })
            ) {
              this.setState({
                isFriend: true
              });
            } else {
              this.setState({
                isFriend: false
              });
            }
          }
        );
      });
  };

  addToFriendList = async () => {
    let friend = {
      id: this.props._id,
      name: this.state.user.name,
      profilepic: this.state.user.profilepic
    };

    await axios
      .post('/users/addToFriendList', friend, { withCredentials: true })
      .then(res => {
        // console.log(res.data);
      });

    this.checkFriendlistToState();
  };

  deleteFromFriendList = async () => {
    let friend = {
      id: this.props._id,
      name: this.state.user.name,
      profilepic: this.state.user.profilepic
    };

    await axios
      .post('/users/deleteFromFriendList', friend, { withCredentials: true })
      .then(res => {
        // console.log(res.data);
      });

    this.checkFriendlistToState();
  };

  render() {
    const { first_name, last_name, _id, profile_pic, login } = this.props;
    const { isFriend } = this.state;
    return (
      <div className='card users' style={{ width: '17rem' }}>
        <div className='image-container'>
          <Link to={`user/${_id}`}>
            <img className='card-img-top' src={profile_pic} alt={first_name} />
          </Link>
        </div>
        <div className='card-body'>
          <div className='user-name'>
            <Link to={`user/${_id}`} className='a_card_title'>
              <h5 className='card-title'>
                {first_name} {last_name}
              </h5>
            </Link>
          </div>
          <div className='follow-btn'>
            {!isFriend ? (
              <button
                type='button'
                className='btn btn-success btn-sm'
                onClick={() => {
                  this.addToFriendList();
                }}
              >
                Follow
              </button>
            ) : (
              <button
                type='button'
                className='btn btn-sm lightRed'
                onClick={() => {
                  this.deleteFromFriendList();
                }}
              >
                Unfollow
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Users;

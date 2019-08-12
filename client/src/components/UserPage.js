import React, { Component } from 'react';
import axios from 'axios';

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
    axios
      .get(`http://localhost:4000/users/getUser/${this.props.match.params.id}`)
      .then(res =>
        this.setState({
          user: res.data.data
        })
      );
  }

  render() {
    return (
      <div>
        <h4>
          {this.state.user.name.first} {this.state.user.name.last}
        </h4>
      </div>
    );
  }
}

export default UserPage;

import React from "react";
import axios from "axios";

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies_list: [233]
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:4000/users/getWatchList")
      .then((res) => this.setState({ movies_list: res.data }))
      .catch((err) => console.log("Error while fetching data", err));
  };

  render() {
    const watchList = this.state.movies_list.map((movie) => (
      <li key={movie}>{movie}</li>
    ));
    return (
      <div>
        <h1>Hey jude</h1>
        <ul>{watchList}</ul>
      </div>
    );
  }
}

export default Watchlist;

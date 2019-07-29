import React from "react";

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies_list: []
    };
  }

  render() {
    return (
      <div>
        <h1>Hey jude</h1>
        <p>Render Movies in list</p>
      </div>
    );
  }
}

export default Watchlist;

import React from "react";

const Search = (props) => {
  return (
    <div>
      <form onSubmit={props.submit}>
        <input
          className="input-bar"
          placeholder="search for a movie"
          name="search"
          value={props.search}
          onChange={props.change}
        />
        <button onClick={props.submit}>search</button>
      </form>
    </div>
  );
};

export default Search;

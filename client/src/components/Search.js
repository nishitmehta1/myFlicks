import React from "react";

const Search = (props) => {
  return (
    <div>
      <form onSubmit={props.submit}>
        <input
          placeholder="search for a movie"
          name="search"
          value={props.search}
          onChange={props.change}
        />
      </form>
    </div>
  );
};

export default Search;

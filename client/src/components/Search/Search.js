import React, { Component } from "react";

export default class Search extends Component {
  state = {
    search: ""
  };
  render() {
    return (
      <div className="search">
        <input type="text" placeholder="search" />
        <button className="search-button">Search</button>
      </div>
    );
  }
}

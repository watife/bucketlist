import React, { Component } from "react";

export default class SideNav extends Component {
  state = {};
  render() {
    const { data, activeItem } = this.props;

    console.log(data);
    return (
      <div className="side-nav">
        <div className="side-nav__header">Bucketlists</div>
        {data &&
          data.map(bucketlist => {
            return (
              <div
                className="bucketlist-name"
                key={bucketlist.id}
                onClick={() => activeItem(bucketlist.id)}
              >
                {bucketlist.name}
              </div>
            );
          })}
        {/* <div className="bucketlist-name buck-active">Things to Buy</div>
        <div className="bucketlist-name">Things to Buy</div>
        <div className="bucketlist-name">Things to Buy</div> */}
      </div>
    );
  }
}

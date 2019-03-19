import React, { Component } from "react";

const SideNav = ({ data, activeItem }) => {
  const bucketlists = data && data.length !== 0 ? data : null;
  return (
    <div className="side-nav">
      <div className="side-nav__header">Bucketlists</div>
      {bucketlists &&
        bucketlists.map(bucketlist => {
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
};

export default SideNav;

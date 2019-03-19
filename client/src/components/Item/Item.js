import React, { Component } from "react";
import DropdownView from "../Dropdown/Dropdown";

export default class Item extends Component {
  state = {
    dropdownOpen: false
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    const { dropdownOpen } = this.state;
    const { activeBucketlist, data } = this.props;

    const bucketlist =
      data &&
      data.filter(bucketlist => {
        return bucketlist.id === activeBucketlist;
      });

    console.log(bucketlist);

    return (
      <div className="item">
        <div className="item__header">
          <p className="">{bucketlist && bucketlist[0].name}</p>
          <DropdownView dropdownOpen={dropdownOpen} toggle={this.toggle} />
        </div>
        {bucketlist &&
          bucketlist[0].items.map(item => {
            return (
              <div className="item__wrapper" key={item.id}>
                <div className="item__body">
                  <p>{item.name}</p>
                  <div className="button-group">
                    <button>Done</button>
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="item__add">
          <input type="text" />
          <button>Add</button>
        </div>
      </div>
    );
  }
}

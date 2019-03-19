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
    const {
      activeBucketlist,
      data,
      onSubmit,
      handleChange,
      item,
      onDelete
    } = this.props;

    const bucketlists = data && data.length !== 0 ? data : null;

    const bucketlist =
      bucketlists &&
      bucketlists.filter(bucketlist => {
        return bucketlist.id === activeBucketlist;
      });

    return (
      <div className="item">
        <div className="item__header">
          <p className="">{bucketlist && bucketlist[0].name}</p>
          <DropdownView
            dropdownOpen={dropdownOpen}
            toggle={this.toggle}
            onDelete={onDelete}
          />
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
          <input type="text" name="item" onChange={handleChange} value={item} />
          <button onClick={onSubmit}>Add</button>
        </div>
      </div>
    );
  }
}

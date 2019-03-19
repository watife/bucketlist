import React, { Component } from "react";
import Api from "../../Api/Api";
import Search from "../Search/Search";
import CreateBucketlist from "../Modal/Modal";
import Item from "../Item/Item";
import SideNav from "../SideNav/SideNav";
import add from "../../../assets/svg/add.svg";
import "./bucketlist.css";

/**
 * Hoc
 */

import Hoc from "../../Hoc";

class Bucketlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketlist: [],
      modal: false,
      activeBucketlist: null,
      error: null,
      list: "",
      item: "",
      search: ""
    };
  }

  async componentDidMount() {
    const response = await Api.get("bucketlists");

    if (response.status === "success" && response.data.length !== 0) {
      return this.setState({
        bucketlist: response.data,
        activeBucketlist: response.data[0].id
      });
    }

    this.setState({ error: response });
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  activeBucketlistChange = id => {
    this.setState({ activeBucketlist: id });
  };

  /**
   * create bucketlist
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async () => {
    const { bucketlist } = this.state;

    const data = {
      name: this.state.list
    };

    try {
      const response = await Api.create("bucketlists", data);

      // get the previous array for bucketlist and add to it
      const newBucketlist = bucketlist.slice();

      if (response.status === "success") {
        newBucketlist.push(response.data);

        this.setState({ bucketlist: newBucketlist });
        this.toggle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * create item in a bucketlist
   */
  onItemSubmit = async () => {
    const { item, activeBucketlist, bucketlist } = this.state;
    const data = {
      name: item
    };

    try {
      const response = await Api.create(
        `bucketlists/${activeBucketlist}/items`,
        data
      );

      const newBucketlist = bucketlist.slice();

      if (response.status === "success") {
        //   get the active bucketlist
        const activeList = newBucketlist.filter(
          list => list.id === activeBucketlist
        );
        activeList[0].items.push(response.data);

        this.setState({ bucketlist: newBucketlist });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * perform search
   */
  onSearch = async () => {
    const { search } = this.state;

    try {
      const response = await Api.get(`bucketlists?q=${search}`);

      if (response.status === "success") {
        console.log(response.data);
        this.setState({ bucketlist: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { bucketlist } = this.state;
    return (
      <div className="bucketlist">
        <div className="bucketlist-wrapper">
          <div className="card-large">
            <div className="card-body">
              <div className="bucketlist-header">
                <p className="logo-small">bucketlist</p>
                <Search
                  handleChange={this.handleChange}
                  onSearch={this.onSearch}
                />
                <img
                  src={add}
                  alt="add"
                  className="add-img"
                  onClick={this.toggle}
                />
                <CreateBucketlist
                  toggle={this.toggle}
                  modal={this.state.modal}
                  handleChange={this.handleChange}
                  onSubmit={this.onSubmit}
                />
              </div>

              <main className="dashboard">
                <SideNav
                  data={bucketlist}
                  activeItem={this.activeBucketlistChange}
                />
                <Item
                  data={bucketlist}
                  activeBucketlist={this.state.activeBucketlist}
                  handleChange={this.handleChange}
                  onSubmit={this.onItemSubmit}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hoc(Bucketlist);

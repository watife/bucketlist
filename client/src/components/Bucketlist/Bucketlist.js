import React, { Component } from "react";
import Api from "../../Api/Api";
import dummyData from "../../dummyData";
import Search from "../Search/Search";
import ModalView from "../Modal/Modal";
import Item from "../Item/Item";
import SideNav from "../SideNav/SideNav";
import add from "../../../assets/svg/add.svg";
import "./bucketlist.css";

export default class Bucketlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketlist: null,
      modal: false,
      activeBucketlist: null,
      error: null
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

  render() {
    const { bucketlist } = this.state;
    return (
      <div className="bucketlist">
        <div className="bucketlist-wrapper">
          <div className="card-large">
            <div className="card-body">
              <div className="bucketlist-header">
                <p className="logo-small">bucketlist</p>
                <Search />
                <img
                  src={add}
                  alt="add"
                  className="add-img"
                  onClick={this.toggle}
                />
                <ModalView toggle={this.toggle} modal={this.state.modal} />
              </div>

              <main className="dashboard">
                <SideNav
                  data={bucketlist}
                  activeItem={this.activeBucketlistChange}
                />
                <Item
                  data={bucketlist}
                  activeBucketlist={this.state.activeBucketlist}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

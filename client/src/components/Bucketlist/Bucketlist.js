import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      search: "",
      edit: null,
      bucketEdit: null
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
      modal: !prevState.modal,
      bucketEdit: null
    }));
  };

  activeBucketlistChange = id => {
    this.setState({ activeBucketlist: id });
  };

  /**
   * reset state
   */

  onStateReset = state => {
    const stateReset = {
      [state]: "",
      edit: null
    };
    this.setState(stateReset);
  };

  /**
   * create bucketlist
   */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async () => {
    const { bucketlist, bucketEdit } = this.state;

    const data = {
      name: this.state.list
    };

    try {
      let ApiCall;
      if (bucketEdit) {
        ApiCall = Api.update(`bucketlists/${bucketEdit.id}`, data);
      } else {
        ApiCall = Api.create("bucketlists", data);
      }
      const response = await ApiCall;

      // get the previous array for bucketlist and add to it
      const newBucketlist = bucketlist.slice();

      if (response.status === "success") {
        if (bucketEdit) {
          const index = newBucketlist.findIndex(
            list => list.id === bucketEdit.id
          );
          console.log(index);
          newBucketlist.splice(index, 1, response.data);
        } else {
          newBucketlist.push(response.data);
        }

        this.setState({
          bucketlist: newBucketlist,
          bucketEdit: null,
          modal: false
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * create item in a bucketlist
   */
  onItemSubmit = async () => {
    const { item, activeBucketlist, bucketlist, edit } = this.state;
    const data = {
      name: item
    };

    try {
      let ApiCall;
      if (edit) {
        ApiCall = Api.update(
          `bucketlists/${activeBucketlist}/items/${edit.id}`,
          data
        );
      } else {
        ApiCall = Api.create(`bucketlists/${activeBucketlist}/items`, data);
      }
      const response = await ApiCall;

      const newBucketlist = bucketlist.slice();

      if (response.status === "success") {
        //   get the active bucketlist
        const activeList = newBucketlist.filter(
          list => list.id === activeBucketlist
        );

        if (edit) {
          const index = activeList[0].items.findIndex(
            item => item.id === edit.id
          );

          activeList[0].items.splice(index, 1, response.data);
          // activeItem.name = response.data.name;
        } else {
          activeList[0].items.push(response.data);
        }

        this.setState({ bucketlist: newBucketlist, item: "", edit: null });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * edit item
   */
  onEditItem = async id => {
    const { activeBucketlist } = this.state;
    const url = `bucketlists/${activeBucketlist}/items/${id}`;
    try {
      const response = await Api.get(url);
      this.setState({ edit: response.data, item: response.data.name });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * edit bucketlist
   */
  onEditBucketlist = async id => {
    const { activeBucketlist } = this.state;
    const url = `bucketlists/${activeBucketlist}`;
    try {
      const response = await Api.get(url);
      this.setState({
        bucketEdit: response.data,
        modal: true,
        list: response.data.name,
        activeBucketlist: response.data.id
      });
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
        this.setState({
          bucketlist: response.data,
          activeBucketlist: response.data[0].id,
          search: ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Delete bucketlist
   */
  onDelete = async () => {
    const { bucketlist, activeBucketlist } = this.state;
    try {
      const response = await Api.delete(`bucketlists/${activeBucketlist}`);

      if (response.status === "success") {
        const newBucketlist = bucketlist.filter(
          bucketlist => bucketlist.id !== activeBucketlist
        );
        this.setState({
          activeBucketlist:
            newBucketlist.length !== 0 ? newBucketlist[0].id : null,
          bucketlist: newBucketlist.length !== 0 ? newBucketlist : null
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Delete Item
   */
  onItemDelete = async id => {
    const { bucketlist, activeBucketlist } = this.state;
    try {
      const response = await Api.delete(
        `bucketlists/${activeBucketlist}/items/${id}`
      );

      if (response.status === "success") {
        const newBucketlist = bucketlist.filter(bucketlist => {
          return (bucketlist.items = bucketlist.items.filter(
            item => item.id !== id
          ));
        });
        this.setState({
          bucketlist: newBucketlist
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { bucketlist, search, item, edit, list, bucketEdit } = this.state;
    return (
      <div className="bucketlist">
        <div className="bucketlist-wrapper">
          <div className="card-large">
            <div className="card-body">
              <div className="bucketlist-header">
                <Link to="/bucketlist">
                  <p className="logo-small">bucketlist</p>
                </Link>
                <Search
                  handleChange={this.handleChange}
                  onSearch={this.onSearch}
                  value={search}
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
                  onEditBucketlist={this.onEditBucketlist}
                  editValue={bucketEdit}
                  onStateReset={this.onStateReset}
                  value={list}
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
                  value={item}
                  onDelete={this.onDelete}
                  onItemDelete={this.onItemDelete}
                  onHandleEdit={this.onEditItem}
                  onEditBucketlist={this.onEditBucketlist}
                  editValue={edit}
                  onStateReset={this.onStateReset}
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

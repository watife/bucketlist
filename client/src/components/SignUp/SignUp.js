/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { Link } from "react-router-dom";

import welcome from "../../../assets/svg/welcome.svg";
import form from "../../../assets/svg/form.svg";

import "../Login/login.css";

// Api connector
import Api from "../../Api/Api";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    const { name, email, password } = this.state;
    const data = {
      name,
      email,
      password
    };

    const url = "auth/signup";

    const response = Api.create(url, data);

    if (response.status === "success") {
      localStorage.setItem("user", JSON.stringify(response.token));
    }
  };

  render() {
    return (
      <div className="login">
        <div className="logo">Bucketlist</div>
        <div className="user__login">
          <div className="user__login--card">
            <div className="card">
              <div className="welcome">
                <img src={welcome} alt="welcome" className="welcome" />
              </div>
              <main className="user__login--main">
                <div className="user__login--text">Welcome, Time to join!</div>
                <div className="input-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input-field"
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="input-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input-field"
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  className="btn btn-signin"
                  type="submit"
                  onClick={this.onSubmit}
                >
                  Register!
                </button>
                <p>
                  Do not have an account?
                  <span className="links">
                    <Link to="/">Login</Link>
                  </span>
                </p>
              </main>
            </div>
          </div>
          <div className="user__login">
            <img src={form} alt="food-truck" className="user__login--img" />
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;

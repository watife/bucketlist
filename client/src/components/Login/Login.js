/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { Link } from "react-router-dom";

import welcome from "../../../assets/svg/welcome.svg";
import form from "../../../assets/svg/form.svg";

import "./login.css";

// Api connector
import Api from "../../Api/Api";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: null
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async () => {
    try {
      const { email, password } = this.state;
      const data = {
        email,
        password
      };

      const url = "auth/login";

      const response = await Api.create(url, data);

      if (response.status === "success") {
        localStorage.setItem("user", JSON.stringify(response.token));
        this.props.history.push("/bucketlist");
        return true;
      }
      this.setState({
        error: response
      });
    } catch (error) {
      this.setState({
        error: error
      });
    }
  };
  render() {
    const { error } = this.state;
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
                <div className="user__login--text">welcome, Let's record!</div>
                <div className="input-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    onChange={this.handleChange}
                  />
                </div>
                <br />
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input-field"
                    onChange={this.handleChange}
                  />
                </div>
                <p className="links">Forgot your password?</p>
                <button
                  className="btn btn-signin"
                  type="submit"
                  onClick={this.onSubmit}
                >
                  Login!
                </button>
                <p>
                  Do not have an account?
                  <span className="links">
                    <Link to="/signup">Register</Link>
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

// SignIn.contextTypes = {
//   router: React.PropTypes.shape({
//     history: React.PropTypes.object.isRequired
//   })
// };

export default SignIn;

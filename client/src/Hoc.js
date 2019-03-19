import React, { Component } from "react";

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.authConfirmation();
    }

    componentDidUpdate() {
      this.authConfirmation();
    }

    authConfirmation = () => {
      const token = localStorage.getItem("user");
      if (!token) {
        return this.props.history.push("/");
      }
    };
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return ComposedComponent;
};

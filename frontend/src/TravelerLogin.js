import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Header from "./Header";
import "styles/login.scss";

class Login extends Component {
  state = {
    signUpFlag: false,
    showEmailError: false,
    showApiError: false
  };
  validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  handleChange = e => {
    this.props.handleChange(e);
  };
  onEnter = () => this.handleSubmit();
  handleSubmit = () => {
    const { account, handleSubmit } = this.props;
    this.validateEmail(account.email)
      ? handleSubmit({ ...account, type: "traveler" })
      : this.setState({ showEmailError: true });
  };
  handleSignUp = e => {
    e.preventDefault();
    this.setState({ signUpFlag: true });
  };
  static getDerivedStateFromProps(props, state) {
    return props.errorMessage ? { ...state, showApiError: true } : null;
  }
  render() {
    const { title, account, authFlag, errorMessage } = this.props;
    return (
      <div className="login">
        <Header />
        <h2>Login to HomeAway</h2>
        <p>
          Need an account? <Link to="/Register:traveler">Sign Up</Link>
        </p>
        <form onSubmit={this.handleSubmit}>
          <h3>Account Login</h3>
          <div>
            <input
              autoFocus
              tabIndex={1}
              type="email"
              name="email"
              placeholder="Email address"
              value={account.email}
              onChange={this.handleChange}
              onKeyPress={e => e.key == "Enter" && this.onEnter()}
              onFocus={() => this.setState({ showEmailError: false, showApiError: false })}
              id="Popover1"
            />
            <Popover
              className="error-popup"
              placement="right"
              isOpen={this.state.showEmailError}
              target="Popover1"
            >
              <PopoverHeader>Error</PopoverHeader>
              <PopoverBody>Invalid email address.</PopoverBody>
            </Popover>
          </div>
          <input
            tabIndex={2}
            type="password"
            name="password"
            placeholder="Password"
            value={account.password}
            onKeyPress={e => e.key == "Enter" && this.onEnter()}
            onFocus={() => this.setState({ showEmailError: false, showApiError: false })}
            onChange={this.handleChange}
          />
          <button
            tabIndex={3}
            type="button"
            className="btn-login"
            name="login"
            onClick={this.handleSubmit}
            id="Popover2"
          >
            Log in
          </button>
          <Popover
            className="error-popup"
            placement="bottom"
            isOpen={this.state.showApiError}
            target="Popover2"
          >
            <PopoverHeader>Error</PopoverHeader>
            <PopoverBody>{errorMessage}</PopoverBody>
          </Popover>
        </form>
      </div>
    );
  }
}

export default Login;

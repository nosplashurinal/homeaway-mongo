import React, { Component } from "react";
import axios from "axios";
import { saveSearch } from "actions";
import { connect } from "react-redux";
import Search from "./Search";
import RecentActivity from "./RecentActivity";
import Header from "./Header";
import "styles/home.scss";
import { toastr } from "react-redux-toastr";
import { Redirect } from "react-router-dom";
import moment from "moment";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToListing: false
    };
  }
  onClickSearch = () => {
    this.props.userInfo
      ? this.setState({ goToListing: true })
      : (this.props.history.push("/TravelerLogin"), toastr.warning('Hold On!', 'Please take a moment to login.'));
  };
  onChangeSearch = query => this.props.saveSearch(query);
  render() {
    const { location, startDate, endDate, adults, children, pets } = this.props.search;
    const guestTotal = adults + children;
    if (this.state.goToListing) {
      return (
        <Redirect
          to={`/Listing?location=${location}&startDate=${startDate}&endDate=${endDate}&guests=${guestTotal}&pets=${pets}`}
        />
      );
    }
    return (
      <div className="home">
        <div className="hero-container">
          <Header design="gradient" showLogin userInfo={this.props.userInfo} />
          <h1>
            Book beach houses, cabins,
            <br />
            condos and more, worldwide.
          </h1>
          <Search
            userInfo={this.props.userInfo}
            onClick={i => this.onClickSearch(i)}
            onChange={i => this.onChangeSearch(i)}
            searchQuery={this.props.search}
          />
          <ul className="message-container">
            <li>
              <h4>Your whole vacation starts here</h4>
              <small>Choose a rental from the world's best selection.</small>
            </li>
            <li>
              <h4>Book and stay with confidence</h4>
              <small>Secure payments, peace of mind</small>
            </li>
            <li>
              <h4>Your vacation your way</h4>
              <small>More space, more privacy, no compromises</small>
            </li>
          </ul>
        </div>
        <RecentActivity />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.home.search,
    userInfo: state.login.userInfo
  };
};

const mapDispatchToProps = dispatch => ({
  saveSearch: query => dispatch(saveSearch(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

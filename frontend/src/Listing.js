import React, { Component } from "react";
import ImageGallery from "templates/ImageGallery";
import RatingDisplay from "templates/RatingDisplay";
import { fetchSearchResults, saveSearch } from "actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";
import queryString from "query-string";
import Search from "./Search";
import "styles/listing.scss";

class Listing extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchSearchResults({ ...this.props.searchQuery });
  }
  onChangeSearch = query => this.props.saveSearch(query);
  onClickSearch = () => {
    const { pets, adults, children } = this.props.searchQuery;
    this.props.fetchSearchResults({
      ...this.props.searchQuery,
      guests: adults + children,
      pets: pets,
      min: 0,
      max: 200
    });
  };
  render() {
    const { properties, isLoading } = this.props;
    return (
      <div className="listing">
        <div className="top-container">
          <Header showLogin userInfo={this.props.userInfo} />
          <Search
            userInfo={this.props.userInfo}
            onClick={i => this.onClickSearch(i)}
            onChange={i => this.onChangeSearch(i)}
            searchQuery={this.props.searchQuery}
            showFilters
          />
        </div>
        {isLoading ? (
          <div className="loader">
            <img src="/images/loading.gif" alt="loading-icon" />
          </div>
        ) : (
          <div className="list-container">
            <h4>{`We found ${properties.length} result${
              properties.length === 1 ? "" : "s"
            } for you.`}</h4>
            {properties.map((item, key) => (
              <div className="list-item" key={key}>
                {item.photos && (
                  <ImageGallery showThumbnail={false} images={item.photos} />
                )}
                <div className="right-container">
                  <div className="top-container">
                    <Link to={`/Property/${item._id}`}>
                      <h4>{item.name}</h4>
                    </Link>
                    <div className="property-info">
                      <span>{`${
                        item.bedrooms === 0
                          ? "Studio"
                          : `${item.bedrooms} BR Apartment`
                      }`}</span>
                      <span>{`${item.bathrooms} Bath`}</span>
                      <span>{`${item.area} sq ft`}</span>
                      <span>{`Sleeps ${item.sleeps}`}</span>
                    </div>
                  </div>
                  <div className="bottom-strip">
                    <p>{`$${item.price} per night`}</p>
                    <RatingDisplay rating={item.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.login.userInfo,
  searchQuery: state.home.search,
  properties: state.listing.properties,
  isLoading: state.listing.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchSearchResults: query => dispatch(fetchSearchResults(query)),
  saveSearch: query => dispatch(saveSearch(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listing);

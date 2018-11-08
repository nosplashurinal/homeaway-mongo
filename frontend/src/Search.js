import React, { Component, Fragment } from "react";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import Select from "react-select";
import Counter from "templates/Counter";
import RadioGroup from "templates/RadioGroup";
import Dropdown from "templates/Dropdown";
import moment from "moment";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "styles/search.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownIsOpen: false,
      showError: false
    };
  }
  onEnter = () => {
    this.onClickSearch();
  };
  toggleDropdown = () =>
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen });
  onClickSearch = () => {
    this.props.userInfo && this.props.searchQuery.location === undefined
      ? this.setState({ showError: true })
      : this.props.onClick(this.props.searchQuery);
  };
  render() {
    const {
      adults,
      children,
      pets,
      startDate,
      endDate,
      location
    } = this.props.searchQuery;
    const { showError, dropdownIsOpen, focusedInput } = this.state;
    return (
      <div className="search">
        <input
          className={`location-search${showError && !location ? " error" : ""}${
            this.props.showFilters ? " filtersActive" : ""
          }`}
          placeholder={`${
            location !== undefined ? location : "Where do you want to go?"
          }`}
          onKeyPress={e => e.key == "Enter" && this.onEnter()}
          onFocus={() => this.setState({ showError: false })}
          onChange={e =>
            this.props.onChange({
              ...this.props.searchQuery,
              location: e.target.value
            })
          }
        />
        <div className="v-line" />
        <div
          className={`my-date-range${
            showError && !startDate && !endDate ? " error" : ""
          }`}
          onClick={() => this.setState({ showError: false })}
        >
          <DateRangePicker
            startDate={startDate === null ? null : moment(startDate)} // momentPropTypes.momentObj or null,
            startDateId="listing_header_start_date" // PropTypes.string.isRequired,
            endDate={endDate === null ? null : moment(endDate)} // momentPropTypes.momentObj or null,
            endDateId="listing_header_end_date" // PropTypes.string.isRequired,
            startDatePlaceholderText={
              startDate === null
                ? "Arrive"
                : moment(startDate).format("YYYY-MM-DD")
            }
            endDatePlaceholderText={
              endDate === null ? "Depart" : moment(endDate).format("YYYY-MM-DD")
            }
            onDatesChange={({ startDate, endDate }) => {
              const formattedStartDate =
                startDate !== null ? startDate.format("YYYY-MM-DD") : null;
              const formattedEndDate =
                endDate !== null ? endDate.format("YYYY-MM-DD") : null;
              this.props.onChange({
                ...this.props.searchQuery,
                startDate: formattedStartDate,
                endDate: formattedEndDate
              });
            }} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
        </div>
        <div className="v-line" />
        <div
          className="dropdown-group"
          onClick={() => this.setState({ showError: false })}
        >
          <button
            type="button"
            className="guest-selector"
            onClick={this.toggleDropdown}
          >{`${adults + children} Guest${adults + children > 1 ? "s" : ""} ${
            pets ? ", Pets" : ""
          }`}</button>
          <Dropdown
            isOpen={dropdownIsOpen}
            onClick={() => this.toggleDropdown()}
          >
            <p>Adults:</p>
            <Counter
              min={1}
              onIncrement={i =>
                this.props.onChange({
                  ...this.props.searchQuery,
                  adults: i
                })
              }
            />
            <p>Children:</p>
            <Counter
              min={0}
              onIncrement={i =>
                this.props.onChange({
                  ...this.props.searchQuery,
                  children: i
                })
              }
            />
            <p>Pets:</p>
            <RadioGroup
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" }
              ]}
              checked={pets ? "yes" : "no"}
              onChange={i =>
                this.props.onChange({
                  ...this.props.searchQuery,
                  pets: i === "yes" ? true : false
                })
              }
            />
            <div className="button-group">
              <button
                type="button"
                className="apply-guests"
                onClick={() => this.toggleDropdown()}
              >
                Apply
              </button>
            </div>
          </Dropdown>
        </div>
        {this.props.showFilters && (
          <Fragment>
            <div className="v-line" />
            <input className="bedroom-filter" placeholder="Bedrooms" />
            <div className="v-line" />
            <div className="price-filter">
              <input
                placeholder="Min Price"
                onChange={i =>
                  this.props.onChange({
                    ...this.props.searchQuery,
                    minPrice: i.target.value
                  })
                }
              />
              <div className="v-line" />
              <input
                placeholder="Max Price"
                onChange={i =>
                  this.props.onChange({
                    ...this.props.searchQuery,
                    maxPrice: i.target.value
                  })
                }
              />
            </div>
          </Fragment>
        )}
        <div className="v-line" />
        <div className="submit">
          <button type="button" id="Popover2" onClick={this.onClickSearch}>
            Search
          </button>
          <Popover
            placement="bottom"
            isOpen={this.state.showError}
            target="Popover2"
          >
            <PopoverHeader>Error</PopoverHeader>
            <PopoverBody>
              {location || <p>Please enter a location.</p>}
            </PopoverBody>
          </Popover>
        </div>
      </div>
    );
  }
}

export default Search;

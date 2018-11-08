import React, { Component } from "react";
import Counter from "templates/Counter";
import Range from "rc-slider/lib/Range";
import "rc-slider/assets/index.css";
import "styles/filters.scss";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 1000,
      current: [this.props.searchQuery.min, this.props.searchQuery.max]
    };
  }
  onChange = e => {
    this.props.onChange({
      ...this.props.searchQuery,
      min: e[0],
      max: e[1]
    });
  };
  render() {
    const {searchQuery} = this.props;
    return (
      <div className="filters">
        <div className="price-filter">
          <p>{`Showing Properties between $${searchQuery.min} and $${
            searchQuery.max
          }`}</p>
          <Range
            onChange={e => this.onChange(e)}
            min={this.state.min}
            max={this.state.max}
            defaultValue={this.state.current}
            trackStyle={[
              {
                height: "12px",
                backgroundColor: "#0067db"
              }
            ]}
            railStyle={{
              height: "12px"
            }}
            handleStyle={{
              borderColor: "blue",
              height: 28,
              width: 28,
              marginLeft: -14,
              marginTop: -9,
              backgroundColor: "black"
            }}
          />
        </div>
        <div className="bedroom-filter">
          <p>Filter by Bedrooms:</p>
          <Counter
            min={0}
            onIncrement={i =>
              this.props.onChange({
                ...this.props.searchQuery,
                bedrooms: i
              })
            }
          />
        </div>
      </div>
    );
  }
}

export default Filters;

import React, { createRef } from "react";

class Pricing extends React.Component {
  constructor(props) {
    super(props);
    this.price = createRef();
  }
  componentWillUnmount() {
    this.props.onChange(parseInt(this.price.current.value));
  }
  render() {
    return (
      <div className="pricing">
        {this.props.nextButton()}
        <h2>Pricing</h2>
        <form className="location-form">
          <div className="form-group">
            <label>Price</label>
            <input
              ref={this.price}
              id="price"
              type="number"
              className="form-control"
              onChange={() => this.props.onChange(parseInt(this.price.current.value))}
            />
          </div>
          <button
            type="button"
            className="main-btn submit"
            name="submit"
            onClick={() => this.props.handleSubmit()}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Pricing;

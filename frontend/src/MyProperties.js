import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";

class MyProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const { properties } = this.props;
    return (
      <div className="properties">
        {properties.length === 0 ? (
          <div className="no-properties">
            <p>You don't have any properties listed.</p>
            <button type="button" className="start-search main-btn">
              List your property
            </button>
          </div>
        ) : (
          <div className="property-list">
            {properties.map((item, key) => {
              const image = item.photos ? item.photos[0] : `/images/photo.svg`;
              return (
                <Card key={key}>
                  {image ? (
                    <CardImg
                      top
                      className={item.photos ? '' : 'no-image'}
                      src={image}
                      alt="Card image cap"
                    />
                  ) : (
                    <CardImg
                      width="60px"
                      src="/images/placeholder.svg"
                      alt="Placeholder"
                    />
                  )}
                  <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle>Location: {item.location}</CardSubtitle>
                    {item.bookedFlag === 1 && (
                      <CardText>
                        This property has an upcoming booking.
                      </CardText>
                    )}
                    <Button><Link to={`/Property/${item._id}`} style={{color: "white"}}>View Details</Link></Button>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default MyProperties;

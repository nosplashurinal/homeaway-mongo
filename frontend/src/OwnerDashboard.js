import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addProperty,
  fetchOwnerProperties,
  fetchMessages,
  replyToMessage,
  updateProfile,
  saveSearch
} from "actions";
import Header from "./Header";
import Inbox from "./Inbox";
import AddProperty from "./AddProperty";
import Search from "./Search";
import { toastr } from "react-redux-toastr";
import MyProperties from "./MyProperties";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "styles/ownerDashboard.scss";

const routes = [
  { value: "inbox", label: "Inbox" },
  { value: "properties", label: "Properties" },
  { value: "profile", label: "Profile" },
  { value: "add-new", label: "Add Property" }
];

const OwnerDropdown = ({ toggle, isOpen }) => {
  return (
    <Dropdown className="header-menu" toggle={() => toggle()} isOpen={isOpen}>
      <DropdownToggle caret>My Account</DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <img src="/images/admin.svg" />
          <Link to="/Traveler/profile">Personal Details</Link>
        </DropdownItem>
        <DropdownItem>
          <img src="/images/sketch.svg" />
          <Link to="/Property/">Property Details</Link>
        </DropdownItem>
        <DropdownItem>
          <img src="/images/logout.svg" />
          <Link to="/OwnerLogin">Sign Out</Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
const Profile = ({ activeItem, onFocus, userInfo }) => (
  <div className="profile">
    <h1>{`${userInfo.firstname} ${userInfo.lastname}`}</h1>
    <div className="profile-info">
      <h3>Profile Information</h3>
      <Form>
        <FormGroup
          className={`small${activeItem === "firstname" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("firstname")}
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            value={userInfo.firstname || ""}
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "lastname" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("lastname")}
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            value={userInfo.lastname || ""}
          />
        </FormGroup>
        <FormGroup className={`${activeItem === "about-me" ? " active" : ""}`}>
          <Input
            onFocus={() => onFocus("about-me")}
            type="textarea"
            name="about-me"
            id="about-me"
            placeholder="About me"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "city-country" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("city-country")}
            type="text"
            name="city-country"
            id="city-country"
            placeholder="My city, country"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "company" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("company")}
            type="text"
            name="company"
            id="company"
            placeholder="Company"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "school" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("school")}
            type="text"
            name="school"
            id="school"
            placeholder="School"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "hometown" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("hometown")}
            type="text"
            name="hometown"
            id="hometown"
            placeholder="Howetown"
          />
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "languages" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("languages")}
            type="text"
            name="languages"
            id="languages"
            placeholder="Languages"
          />
        </FormGroup>
        <FormGroup
          className={`gender${activeItem === "gender" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("gender")}
            type="select"
            name="gender"
            id="gender"
            defaultValue={null}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Input>
        </FormGroup>
        <FormGroup
          className={`small${activeItem === "phone" ? " active" : ""}`}
        >
          <Input
            onFocus={() => onFocus("phone")}
            type="phone"
            name="phone"
            id="phone"
            placeholder="Phone"
          />
        </FormGroup>
        <Button className="save-changes">Save changes</Button>
      </Form>
    </div>
  </div>
);

class OwnerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFormGroup: undefined,
      activeNav: props.location.pathname.split("OwnerDashboard/")[1]
    };
  }
  componentDidUpdate(prevProps) {
    const status = this.props.addPropertyStatus;
    if (status && prevProps.addPropertyStatus !== status) {
      status == 200
        ? toastr.success(`Success! Your property is live now!`)
        : toastr.error(
            `There has been some problem while adding your property. Please try again.`
          );
      this.props.history.push("/OwnerDashboard/properties");
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.addPropertyStatus == 200) {
      return {
        ...state,
        activeNav: "properties"
      };
    } else return null;
  }
  setActiveNav = item => this.setState({ activeNav: item.value });
  render() {
    if (!this.props.userInfo) {
      toastr.warning("Hold On!", "You're not signed in.");
      return <Redirect to="/OwnerLogin" />;
    }
    const { activeFormGroup, activeNav, userInfo } = this.state;
    console.log(this.props.messages);
    return (
      <div className="od">
        <Header
          hideLyp
          renderDropdown={(toggle, isOpen) => (
            <OwnerDropdown toggle={() => toggle()} isOpen={isOpen} />
          )}
        />
        <Search
          searchQuery={this.props.searchQuery}
          onChange={i => this.onChangeSearch(i)}
          showFilters
        />
        <ul className={`${activeNav} nav`}>
          {routes.map((item, key) => (
            <li key={key} className={activeNav === item.value ? "active" : ""}>
              <Link
                onClick={() => this.setActiveNav(item)}
                to={`/OwnerDashboard/${item.value}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="top-container">
          <Switch>
            <Route
              path="/OwnerDashboard/properties"
              render={() => (
                <MyProperties
                  properties={this.props.properties}
                  onLoad={() => this.props.fetchMyProperties()}
                />
              )}
            />
            <Route
              path="/OwnerDashboard/add-new"
              render={() => (
                <AddProperty onAdd={data => this.props.onAddProperty(data)} />
              )}
            />
            <Route
              path="/OwnerDashboard/profile"
              render={() => (
                <Profile
                  activeItem={activeFormGroup}
                  onFocus={activeFormGroup =>
                    this.setState({ activeFormGroup })
                  }
                  userInfo={this.props.userInfo}
                />
              )}
            />
            <Route
              path="/OwnerDashboard/inbox"
              render={() => (
                <Inbox
                  allMessages={this.props.messages}
                  iam={this.props.userInfo._id}
                  onMessage={data =>
                    this.props.replyToMessage({
                      ...data,
                      from: this.props.userInfo._id,
                      name: this.props.userInfo.firstname
                    })
                  }
                  onLoad={() =>
                    this.props.fetchMessages(this.props.userInfo._id)
                  }
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addPropertyStatus: state.ownerdashboard.addPropertyStatus,
  properties: state.ownerdashboard.properties,
  messages: state.ownerdashboard.messages,
  userInfo: state.login.userInfo,
  searchQuery: state.home.search
});

const mapDispatchToProps = dispatch => ({
  onAddProperty: data => dispatch(addProperty(data)),
  fetchMyProperties: id => dispatch(fetchOwnerProperties(id)),
  fetchMessages: id => dispatch(fetchMessages(id)),
  replyToMessage: data => dispatch(replyToMessage(data)),
  updateProfile: data => dispatch(updateProfile(data)),
  saveSearch: query => dispatch(saveSearch(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerDashboard);

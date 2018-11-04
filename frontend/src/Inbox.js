import React, { Component } from "react";
import Messages from "./Messages";
import "styles/inbox.scss";

const items = [
  {
    name: "Bharadwaj Ramakrishnan"
  }
];

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      senders: []
    };
  }
  componentDidMount() {
    this.props.onLoad();
  }
  static getDerivedStateFromProps(props, state) {
    if (props.allMessages.length !== state.count) {
      let senders = props.allMessages.filter(item => item.to === props.iam);
      return {
        senders
      };
    } else return null;
  }
  inboxList = items => (
    <section id={"user_list"}>
      <ul id={"list_container"}>
        {items.map((item, key) => (
          <li className={"list_item"} key={key}>
            <a>
              <div className={"user_card"}>
                <img
                  className={"card_picture"}
                  src="http://placehold.it/100x100"
                />
                <div className={"card_info"}>
                  <div id={"name"}>{item.sendername}</div>
                </div>
                <span className={`arrow`} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
  render() {
    return (
      <div className="inbox">
        <div id="user_list_wrap">{this.inboxList(this.state.senders)}</div>
        <div id="user_profile_wrap">{/* <Messages orderId={1} /> */}</div>
      </div>
    );
  }
}

export default Inbox;

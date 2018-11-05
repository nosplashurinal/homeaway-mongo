import React, { Component } from "react";
import Messages from "./Messages";
import "styles/inbox.scss";
import moment from "moment";
import uniqby from "lodash.uniqby";

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
      senders: [],
      conversation: [],
      activeItem: null
    };
  }
  componentDidMount() {
    this.props.onLoad();
  }
  static getDerivedStateFromProps(props, state) {
    if (props.allMessages.length !== state.count) {
      let senders = props.allMessages.filter(item => item.to === props.iam);
      senders = uniqby(senders, "from");
      return {
        senders,
        count: props.allMessages.length
      };
    } else return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeItem !== this.state.activeItem) {
      let conversation = this.props.allMessages.filter(
        item =>
          (item.to === this.props.iam || item.to === this.state.activeItem) && (item.from === this.props.iam || item.from === this.state.activeItem)
      );
      conversation.sort((left, right) =>
        moment.utc(left.timestamp).diff(moment.utc(right.timestamp))
      );
      this.setState({ conversation });
    }
  }
  inboxList = items => (
    <section id={"user_list"}>
      <ul id={"list_container"}>
        {items.length === 0 ? (
          <li className="list_item">
            <div className={"user_card"}>
              <img
                className={"card_picture"}
                src="/images/envelope.svg"
              />
              <div className={"card_info"}>
                <div id={"name"}>You have no messages.</div>
              </div>
            </div>
          </li>
        ) : (
          items.map((item, key) => (
            <li
              className={"list_item"}
              key={key}
              onClick={() => this.setState({ activeItem: item.from })}
            >
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
          ))
        )}
      </ul>
    </section>
  );
  render() {
    return (
      <div className="inbox">
        <div id="user_list_wrap">{this.inboxList(this.state.senders)}</div>
        <div id="user_profile_wrap">
          <Messages
            conversation={this.state.conversation}
            submitMessage={data =>
              this.props.onMessage({ ...data, to: this.state.activeItem })
            }
          />
        </div>
      </div>
    );
  }
}

export default Inbox;

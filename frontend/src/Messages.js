import React, { createRef } from "react";
import Message from "templates/Message";
import "styles/messages.scss";

const users = {
  userIds: ["1"],
  avatarLocation: "",
  userById: {
    1: {
      userId: "1",
      userName: "pra7na",
      name: "Prasanna T",
      email: "prasanna.t@caratlane.com",
      phone: "9090990909",
      team: "Innovations",
      role: "Visualizer",
      avatarUrl: "images/admin.svg"
    }
  }
};

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.input = createRef();
  }
  onSubmitMessage = () => {
    const content = this.input.current.value;
    this.input.current.value = "";
    this.props.submitMessage({ msgbody: content });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
    }
  }
  render() {
    return (
      <div id={"comments"} style={{ height: "100%" }}>
        <div style={{ height: "100%", overflowY: "auto" }}>
          <div id={"messages"}>
            <div id={"message_container"}>
              <div id={"message_pane_scroller"}>
                {this.props.conversation.map(item => (
                  <Message
                    key={item._id}
                    avatar={`/images/admin.svg`}
                    content={item.body}
                    timestamp={item.timestamp}
                    owner={item.sendername}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div id={"body"}>
          <form onSubmit={e => e.preventDefault()}>
            <div className={"editor"}>
              <textarea
                ref={this.input}
                placeholder="Type a message..."
              />
            </div>
            <button
              id={"submit"}
              className={"active"}
              onClick={() => this.onSubmitMessage()}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Messages;

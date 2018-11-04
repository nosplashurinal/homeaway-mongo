import React, { Component, createRef } from "react";
import { Form, FormGroup, Input } from "reactstrap";

class MessageModal extends Component {
  constructor() {
    super();
    this.message = createRef();
  }
  render() {
    console.log(this.props.messageStatus);
    return !this.props.messageStatus ? (
      <div className="message-modal">
        <h3>Ask Owner a Question</h3>
        <Form>
          <FormGroup className={`big`}>
            <textarea
              ref={this.message}
              name="message"
              id="message"
              placeholder="Message to Owner"
            />
          </FormGroup>
          <button
            type="button"
            className="send-message main-btn"
            onClick={() =>
              this.props.onSend({
                msgbody: this.message.current.value
              })
            }
          >
            Send
          </button>
        </Form>
        <button
          type="button"
          className="close-modal"
          onClick={() => this.props.onClose()}
        >
          <svg
            id="Capa_1"
            viewBox="0 0 212.982 212.982"
            width="16px"
            height="16px"
          >
            <g id="Close">
              <path
                style={{ fillRule: "evenodd", clipRule: "evenodd" }}
                d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"
                fill="#ccc"
              />
            </g>
          </svg>
        </button>
      </div>
    ) : (
      <div className="message-modal">
        <h3>{this.props.messageStatus}</h3>
        <button
          type="button"
          className="close-modal"
          onClick={() => this.props.onClose()}
        >
          <svg
            id="Capa_1"
            viewBox="0 0 212.982 212.982"
            width="16px"
            height="16px"
          >
            <g id="Close">
              <path
                style={{ fillRule: "evenodd", clipRule: "evenodd" }}
                d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"
                fill="#ccc"
              />
            </g>
          </svg>
        </button>
      </div>
    );
  }
}

export default MessageModal;

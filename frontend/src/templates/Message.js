import React from "react";
import "styles/message.scss";
import moment from "moment";

const Message = ({ avatar, content, owner, timestamp }) => {
  return (
    <div id={"message"}>
      <div id={"gutter"}>
        <div id={"icon"}>
          <button
            id={"thumb"}
            style={{ backgroundImage: "url(" + avatar + ")" }}
            aria-hidden="true"
            tabIndex="-1"
          />
        </div>
      </div>
      <div id={"content"}>
        <div id={"header"}>
          <span>{owner}</span>
        </div>
        <span id={"body"}>{content}</span>
        <div id={"footer"}>
          <div id={"timestamp"}>
            <span>{moment(timestamp).format("dddd, MMMM Do YYYY")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

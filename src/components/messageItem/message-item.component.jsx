import React from "react";
import "./message-item.styles.scss";

const MessageItem = ({ msg, authUser }) => {
  const alighClass = authUser === msg.from ? "left" : "right";

  return (
    <li className={`message-item ${alighClass}`}>
      <span className="message-txt">{msg.message}</span>
    </li>
  );
};

export default MessageItem;

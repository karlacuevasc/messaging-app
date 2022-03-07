import React from "react";
import PropTypes from "prop-types";
import { MessageForm } from "./messageForm";
import { MyMessage } from "./myMessage";
import { TheirMessage } from "./theirMessage";

export const ChatFeed = props => {
	const { chats, activeChat, userName, messages } = props;

	const chat = chats && chats[activeChat];

	console.log(chat, userName, messages);

	return <div>ChatFeed</div>;
};

ChatFeed.propTypes = {
	chats: PropTypes.string,
	activeChat: PropTypes.string,
	userName: PropTypes.string,
	messages: PropTypes.string
};

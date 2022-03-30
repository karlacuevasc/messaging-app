import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "./register";
import { ChatEngine } from "react-chat-engine";
import { ChatFeed } from "../component/chatFeed";
import "../../styles/dashboard.scss";

export function Dashboard() {
	const auth = useAuth();
	const history = useHistory();

	useEffect(
		() => {
			if (!auth.token) {
				history.push("/login");
			}
		},
		[auth.token]
	);

	return (
		<div>
			<h1 className="text-center">Dashboard Page</h1>
			<ChatEngine
				projectID="6fdc3814-45fc-4f94-9d1b-04648eacd20b"
				userName="janedoe"
				userSecret="test123"
				renderChatFeed={chatAppProps => <ChatFeed {...chatAppProps} />}
			/>

			<button className="btn btn-danger" onClick={() => auth.logout()}>
				Logout
			</button>
		</div>
	);
}

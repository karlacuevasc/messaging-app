import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "./register";
import { ChatEngine } from "react-chat-engine";
import { ChatFeed } from "../component/chatFeed";
import "/Users/karlacuevas/Documents/messaging-app/src/front/styles/dashboard.scss";

export function Dashboard() {
	const auth = useAuth();
	const history = useHistory();

	React.useEffect(
		() => {
			if (!auth.token) {
				history.push("/login");
			}
		},
		[auth.token]
	);

	return (
		<div>
			<h1>Dashboard Page</h1>
			<ChatEngine
				projectID="6fdc3814-45fc-4f94-9d1b-04648eacd20b"
				userName="janedoe"
				userSecret="test123"
				renderChatFeed={chatAppProps => <ChatFeed {...chatAppProps} />}
			/>

			<button onClick={() => auth.logout()}>Logout</button>
		</div>
	);
}

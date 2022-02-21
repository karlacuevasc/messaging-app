import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../pages/register";
import { useHistory } from "react-router";

export const Navbar = () => {
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
		<nav className="navbar navbar-dark bg-dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Chatbook</span>
				</Link>
				{!auth.token ? (
					<div className="ml-auto">
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>
					</div>
				) : (
					<button className="btn btn-danger" onClick={() => auth.logout()}>
						Logout
					</button>
				)}
			</div>
		</nav>
	);
};

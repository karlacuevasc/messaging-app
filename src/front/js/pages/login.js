import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "./register";
import { Banner } from "../component/loginBanner";
import "../../styles/login.scss";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const history = useHistory();
	const login = useAuth();

	useEffect(
		() => {
			if (login.token) {
				history.push("/dashboard");
			}
		},
		[login.token]
	);

	const handleEnter = event => {
		console.log(event);
		if (event.keyCode == "13") {
			login.login(email, password);
		}
	};

	return (
		<div>
			<Banner />
			<div className="mx-auto mt-5 w-50">
				<form>
					{login.error && <div className="alert alert-danger">Error at login</div>}
					<div className="mb-3">
						{/* <label htmlFor="exampleInputEmail1" className="form-label">
					</label> */}
						<input
							type="email"
							placeholder="Email"
							className="email form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							value={email}
							onChange={ev => setEmail(ev.target.value)}
						/>
						<div id="emailHelp" className="neverShare form-text">
							<i>*We never share your email with anyone else</i>
						</div>
					</div>
					<div className="mb-3">
						{/* <label htmlFor="exampleInputPassword1" className="form-label">
						Password
					</label> */}
						<input
							type="password"
							placeholder="Password"
							className="password form-control"
							id="exampleInputPassword1"
							value={password}
							onChange={ev => setPassword(ev.target.value)}
							onKeyDown={ev => handleEnter(ev)}
						/>
					</div>

					<button type="button" className="login btn btn-dark" onClick={() => login.login(email, password)}>
						Login
					</button>
					<br />
					<h6 className="divider">
						<span className="or">or</span>
					</h6>
					<a type="button" href="/register" className="register btn btn-outline-secondary">
						Register
					</a>
				</form>
			</div>
		</div>
	);
};

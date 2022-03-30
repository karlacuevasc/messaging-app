import React, { useEffect } from "react";
import { useHistory } from "react-router";
import create from "zustand";
import { persist } from "zustand/middleware";
import { RegisterBanner } from "../component/registerBanner";

export const useAuth = create(
	persist(
		set => ({
			error: false,
			success: false,
			token: null,

			register: async (email, password) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				});

				if (response.status === 204) {
					set({ success: true });
				} else {
					set({ error: true });
				}
			},

			login: async (email, password) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				});

				if (response.status === 200) {
					const payload = await response.json();
					set({ token: payload.token });
				} else {
					set({ error: true });
				}
			},

			logout: () => set({ token: null })
		}),
		{
			name: "auth-app",
			getStorage: () => sessionStorage
		}
	)
);

export const Register = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const history = useHistory();
	const register = useAuth();

	useEffect(
		() => {
			if (register.success) {
				history.push("/login");
			}
		},
		[register.success]
	);

	const handleEnter = event => {
		console.log(event);
		if (event.keyCode == "13") {
			register.register(email, password);
		}
	};

	return (
		<div>
			<RegisterBanner />
			<div className="mx-auto mt-5 w-50">
				<form>
					{register.error && <div className="alert alert-danger">Error at register</div>}
					<div className="mb-3">
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

					<button
						type="button"
						className="register btn btn-dark"
						onClick={() => register.register(email, password)}>
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

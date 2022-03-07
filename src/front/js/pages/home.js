import React from "react";
import "../../styles/home.scss";
import { UploadImage } from "../component/UploadImage";
import { Login } from "./login";

export const Home = () => {
	return (
		<div className="text-center">
			{/* <UploadImage /> */}
			<Login />
		</div>
	);
};

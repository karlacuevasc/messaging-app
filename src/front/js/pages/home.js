import React from "react";
import "../../styles/home.scss";
import { Banner } from "../component/banner";
import { UploadImage } from "../component/UploadImage";
import { Login } from "./login";

export const Home = () => {
	return (
		<div className="text-center">
			{/* <UploadImage /> */}
			<Banner />
			<Login />
		</div>
	);
};
